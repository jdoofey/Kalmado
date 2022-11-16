from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task, project

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
