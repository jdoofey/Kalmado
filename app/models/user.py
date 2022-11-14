from .db import db
from .project import project_members
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .task import task_assignees



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255))
    personal_note = db.Column(db.String(3000), default="Write some notes here!")

    tasks = db.relationship("Task", back_populates = "owner")
    comments = db.relationship("Comment", back_populates = "owner")
    task_assignees = db.relationship("Task", secondary = task_assignees, back_populates="assignees")
    projects = db.relationship("Project", secondary=project_members, back_populates="members")
    project_owners = db.relationship("Project", back_populates = "owner")
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'avatar': self.avatar,
        }
