from time import timezone
from .db import db
from .project_member import project_members

class Project(db.Model):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(30), nullable = False)
  description = db.Column(db.String(3000))
  icon = db.Column(db.String(50), default = 'default')
  color = db.Column(db.Column(20), nullable = False, default = '#6af0b1')
  created_at = db.Column(db.DateTime(timezone = True), nullable = False)
  updated_at = db.Column(db.DateTime(timezone = False), nullable = False)
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

  project_user = db.relationship('User', secondary = project_members, back_populates="projects")
  sections = db.relationship('Section', back_populates = 'section', cascade = "all, delete")

  def to_dict(self):
    team_members = {}
    for member in self.team_members:
      team_members[member.id] = {
        "member_id":member.id,
        "member_first_name": member.first_name,
        "member_lat_name": member.last_name

      }
