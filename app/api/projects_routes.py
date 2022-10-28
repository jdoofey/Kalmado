from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task
from app.forms.project_form import ProjectForm

projects_routes = Blueprint('projects', __name__)

@projects_routes.route('/', methods=["GET"])
@login_required
def get_all_projects():
  projects = Project.query.order_by(Project.created_at.desc()).all()
  project_lst = []
  for project in projects:
    project_dict = project.to_dict()
    project_lst.append(project_dict)
  return jsonify(project_lst)

@projects_routes.route('/current', methods=["GET"])
@login_required
def get_current_user_projects():
  projects = Project.query.filter(current_user.id== Project.owner_id).order_by(Project.created_at.desc()).all()
  project_lst=[]
  for project in projects:
    project_dict = project.to_dict()
    project_lst.append(project_dict)
  return jsonify(project_lst)

  
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
