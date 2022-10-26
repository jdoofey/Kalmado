from .db import db

class Section(db.Model):
  __tablename__ = "sections"

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(50), nullable = False)
  board_idx = db.Column(db.Integer, nullable = False, default=0)
  created_at = db.Column(db.DateTime(timezone = True), nullable = False)
  updated_at = db.Column(db.DateTime(timezone = True), nullable = False)
  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable = False)

  task = db.Relationship("Task", cascade="all, delete")
  projects = db.Relationship("Project", back_populates="project_sections")

  def to_dict(self):
    return {
      "id": self.id,
      "title":self.title,
      "board_idx": self.board_idx,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      
    }
