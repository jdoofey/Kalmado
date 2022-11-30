from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task, project
from operator import itemgetter
sections_routes = Blueprint('sections', __name__)

@sections_routes.route('/<int:project_id>', methods=["GET"])
@login_required
def get_all_project_sections(project_id):
  sections = Section.query.filter(project_id==project_id)
  sections_lst = []
  for section in sections:
    section_dict = section.to_dict()
    sections_lst.append(section_dict)
  return jsonify(sections_lst)

@sections_routes.route('/', methods=['POST'])
@login_required
def add_section():
  title, board_idx, project_id = itemgetter("title", "boardIdx", "projectId")(request.json)
  section = Section(
    title = title,
    board_idx = board_idx,
    project_id = project_id
  )
  db.session.add(section)
  db.session.commit()
  return section.to_dict()

@sections_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_section(id):
  section = Section.query.get(id)
  title, board_idx= itemgetter("title", "boardIdx")(request.json)
  section.title = title
  section.board_idx = board_idx
  db.session.commit()
  return section.to_dict()
