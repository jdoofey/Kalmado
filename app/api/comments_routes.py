from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Comment, User, Project, Section, Task
from app.forms.comment_form import CommentForm
from datetime import datetime, date
from operator import itemgetter


comments_routes = Blueprint('comments', __name__)

# DONT NEED ROUTE FOR READ CUZ ITS ALREADY ATTACHED TO TASK
@comments_routes.route('/<int:task_id>', methods=['GET'])
@login_required
def get_comments(task_id):
  task = Task.query.get(task_id)
  task_dct = task.to_dict()
  print('\n\n\n -0-----these are comments--- \n\n\n', task_dct)
  return jsonify(task_dct["comments"])


@comments_routes.route('/<int:task_id>', methods=['POST'])
@login_required
def create_comment(task_id):
  body = itemgetter('commentBody')(request.json)
  task = Task.query.get(task_id)
  comment = Comment(
    created_at = datetime.today(),
    updated_at = datetime.today(),
    user_id = current_user.id,
    body = body
  )
  db.session.add(comment)
  task.comments.append(comment)
  db.session.commit()
  return comment.to_dict()

@comments_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
  comment = Comment.query.get(comment_id)
  db.session.delete(comment)
  db.session.commit()
  return {"message":"Successfully deleted", "statusCode":200}
