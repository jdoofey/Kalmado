from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task, project

sections_routes = Blueprint('sections', __name__)

@sections_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_project_section(id):
  section = Section.query.get(id)
  return section.to_dict()
