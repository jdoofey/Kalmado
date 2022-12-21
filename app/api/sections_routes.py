from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task, project
from operator import itemgetter
from datetime import datetime
sections_routes = Blueprint('sections', __name__)

@sections_routes.route('/<int:proj_id>', methods=["GET"])
@login_required
def get_all_project_sections(proj_id):
  sections = Section.query.filter(Section.project_id==proj_id)
  sections_lst = []
  for section in sections:
    section_dict = section.to_dict()
    sections_lst.append(section_dict)
  return jsonify(sections_lst)

@sections_routes.route('/', methods=['POST'])
@login_required
def add_section():
  title,projectId = itemgetter("title", "projectId")(request.json)
  print(projectId,"\n\n\n\n---HIIITTTT\n\n\n\n")
  section = Section(
    title = title,
    project_id = projectId,
    created_at = datetime.today(),
    updated_at = datetime.today(),
  )
  db.session.add(section)
  db.session.commit()
  return section.to_dict()

@sections_routes.route('/<int:id>', methods=['POST'])
@login_required
def delete_section(id):
  section = Section.query.get(id)

  db.session.delete(section)
  db.session.commit()

@sections_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_section(id):
  section = Section.query.get(id)
  title= itemgetter("title")(request.json)
  section.title = title

  db.session.commit()
  return section.to_dict()
