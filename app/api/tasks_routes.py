from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Project, Section, Task
from app.forms.task_form import TaskForm
from datetime import datetime, date
from operator import itemgetter
tasks_routes = Blueprint('tasks', __name__)


@tasks_routes.route('/', methods=['GET'])
@login_required
def get_tasks():
  projects = Project.query.filter(current_user.id== Project.owner_id).order_by(Project.created_at.desc()).all()


@tasks_routes.route('/', methods=['POST'])
@login_required
def create_task():
  form = TaskForm()

  form['csrf_token'].data = request.cookies['csrf_token']
  projectId, dueDate, status, priority  = itemgetter('projectId', "dueDate", "status", "priority")(request.json)

  if form.validate_on_submit():
    # end_date = datetime.strptime(dueDate, "%Y-%M-%D")
    task = Task(
      title = form.title.data,
      description = form.description.data,
      status = status,
      priority = priority,
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

  title = itemgetter("title")(request.json)
  description = itemgetter("description")(request.json)
  dueDate= itemgetter("dueDate")(request.json)
  priority= itemgetter("priority")(request.json)
  status= itemgetter("status")(request.json)
  completed= itemgetter("completed")(request.json)
  print("--------adfasdf---", dueDate, priority, status, completed)

  task.title = title
  task.desciption = description
  task.status = status
  task.priority = priority
  task.end_date = date(int(dueDate[:4]), int(dueDate[5:7]), int(dueDate[8:10]))
  task.completed = completed

  db.session.commit()
  updated_task = task.to_dict()
  return updated_task


@tasks_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_task(id):
  task = Task.query.get(id)
  db.session.delete(task)
  db.session.commit()
  return {"message":"Successfully deleted", "statusCode":200}
