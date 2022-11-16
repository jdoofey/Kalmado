# from flask import Blueprint, request, jsonify
# from flask_login import login_required, current_user
# from app.models import db, Comment, User, Project, Section, Task
# from app.forms.task_form import TaskForm
# from datetime import datetime, date
# from operator import itemgetter

# comments_routes = Blueprint('comments', __name__)

# @comments_routes.route('/<int:task_id>', methods=['GET'])
# @login_required
# def get_comments(task_id):
#   task = Task.query.get(task_id)
#   task_dct = task.to_dict()
#   comments = Comment.query.filter(Comment.)
