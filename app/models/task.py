from .db import db

class Task(db.Model):
  __tablename__ = "tasks"

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(70))
  description = db.Column(db.String(300))
  status = db.Column(db.String(30))
  priority = db.Column(db.String(30))
  start_date = db.Column(db.DateTime(timezone = True))
  end_date = db.Column(db.DateTime(timezone = True))
  completed = db.Column(db.Boolean, default = False, nullable = False)
  created_at = db.Column(db.DateTime(timezone = True), nullable = False)
  updated_at = db.Column(db.DateTime(timezone = True), nullable = False)

  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  assignee_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = True)
  section_id = db.Column(db.Integer, db.ForeignKey("sections.id"), nullable = False)

  sections = db.relationship("Section", back_populates = "tasks")
  owner = db.relationship("User", back_populates = "tasks")
  ## TODO work on assignees relationship, may need join
  ## TODO WORK ON TO DICT
