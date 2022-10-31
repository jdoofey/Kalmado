from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task

tasks_routes = Blueprint('tasks', __name__)

@tasks_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_task_by_id(id):
  task = Task.query.get(id)
  return task.to_dict()

@tasks_routes.route('/', methods=['POST'])
@login_required
def create_task():
  
