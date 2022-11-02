from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task
from app.forms.task_form import TaskForm
from datetime import datetime, date
from operator import itemgetter
tasks_routes = Blueprint('tasks', __name__)


# @tasks_routes.route('/', methods=['GET'])
# @login_required
# def get_tasks():


@tasks_routes.route('/', methods=['POST'])
@login_required
def create_task():
  form = TaskForm()

  form['csrf_token'].data = request.cookies['csrf_token']
  projectId, dueDate = itemgetter('projectId', "dueDate")(request.json)
  print(dueDate)
  if form.validate_on_submit():
    # end_date = datetime.strptime(dueDate, "%Y-%M-%D")
    task = Task(
      title = form.title.data,
      description = form.description.data,
      status = form.status.data,
      priority = form.priority.data,
      created_at = datetime.today(),
      updated_at = datetime.today(),
      owner_id = current_user.id,
      section_id = 1,
      project_id= projectId,
      end_date = date(int(dueDate[:4]), int(dueDate[5:7]), int(dueDate[8:10]))

      # date(int(dueDate[:4]), int(dueDate[5:7]), int(dueDate[8:10]))
    )
    # project = Project.query.get(projectId)
    # project_dct = project.to_dict()
    # project_dct.tasks.append(task)
    db.session.add(task)
    db.session.commit()

    return task.to_dict()
  return {"message":"Bad Data"}

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
