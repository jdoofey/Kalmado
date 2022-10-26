from .db import db

class Section(db.Model):
  __tablename__ = "sections"

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(50), nullable = False)
  board_idx = db.Column(db.Integer, nullable = False, default=0)
  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable = False)
