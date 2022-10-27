from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task
from app.forms.project_form import ProjectForm
projects_routes = Blueprint('projects', __name__)

@projects_routes.route('/', methods=["GET"])
@login_required
def get_all_projects():
  projects = Project.query.order_by(Project.created_at.desc()).all()

  return {project.id: projects.to_dict() for project in projects}

@projects_routes.route('<int:id>', methods=["GET"])
@login_required
def get_project_by_id():
  project = Project.query.get(id)

  return project.to_dict()

@projects_routes.route('/', methods=["POST"])
@login_required
def create_project():
  form = ProjectForm()
  form['csrf_token'].data = request.cookies['csrf_token']