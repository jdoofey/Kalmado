from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task, project
from app.forms.project_form import ProjectForm
from datetime import date, datetime
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


@projects_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_project_by_id(id):
  project = Project.query.get(id)

  return project.to_dict()

@projects_routes.route('/', methods=["POST"])
@login_required
def create_project():
  form = ProjectForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    project = Project(
      title = form.title.data,
      description = form.description.data,
      owner_id = current_user.id,
      created_at = datetime.today(),
      updated_at = datetime.today()
    )
    db.session.add(project)
    db.session.commit()
    project.members.append(current_user)
    db.session.commit()

    return project.to_dict()

@projects_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_project(id):
  project = Project.query.get(id)

  form = ProjectForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    project.title = form.title.data
    project.description = form.description.data

    db.session.commit()
    updated_project = project.to_dict()
    return updated_project
  return {"message":"Bad Data"}

@projects_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_project(id):
  project = Project.query.get(id)

  db.session.delete(project)
  db.session.commit()
  return {"message":"Successfully deleted", "statusCode":200}
