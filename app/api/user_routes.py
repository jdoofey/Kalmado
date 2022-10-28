from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Project

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    user_lst = []

    for user in users:
        user_dict = user.to_dict()
        projects = Project.query.filter(Project.owner_id == user.id)
        projects_dict = projects.to_dict()
        user_lst["projects"] = projects_dict

        user_lst.append(user_dict)
    return jsonify(user_lst)


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
