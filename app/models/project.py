from time import timezone
from .db import db


project_members = db.Table("project_members", db.Model.metadata,
  db.Column('project_id', db.Integer, db.ForeignKey('projects.id'), primary_key = True),
  db.Column('member_id', db.Integer, db.ForeignKey('users.id'), primary_key = True)
  )

class Project(db.Model):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(30), nullable = False)
  description = db.Column(db.String(3000))
  icon = db.Column(db.String(50), default = 'default')
  color = db.Column(db.String(20), nullable = False, default = '#6af0b1')
  created_at = db.Column(db.DateTime(timezone = True), nullable = False)
  updated_at = db.Column(db.DateTime(timezone = True), nullable = False)
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

  members = db.relationship("User", secondary=project_members, back_populates="projects")
  sections = db.relationship("Section", back_populates = "projects")
  owner = db.relationship("User", back_populates="project_owners")
  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "icon": self.icon,
      "color": self.color,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      "owner_id": self.owner_id,
      "members": [member.id for member in self.members] if self.members else [],
      "sections": [section.id for section in self.sections] if self.sections else []
    }
