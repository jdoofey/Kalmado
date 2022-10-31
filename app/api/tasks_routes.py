from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task
from app.forms.task_form import TaskForm
from datetime import datetime

tasks_routes = Blueprint('tasks', __name__)

@tasks_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_task_by_id(id):
  task = Task.query.get(id)
  return task.to_dict()

@tasks_routes.route('/', methods=['POST'])
@login_required
def create_task():
  form = TaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    task = Task(
      title = form.title.data,
      description = form.description.data,
      status = form.status.data,
      priority = form.priority.data,
      created_at = datetime.today(),
      updated_at = datetime.today(),
      owner_id = current_user.id,
      section_id = 1
    )
    db.session.add(task)
    db.session.commit()

    return task.to_dict()

@tasks_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_task(id):
  task = Task.query.get(id)

  form = TaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    task.title = form.title.data
    task.description = form.description.data
    task.status = form.status.data
    task.priority = form.priority.data

    db.session.commit()
    updated_task = task.to_dict()
    return updated_task
