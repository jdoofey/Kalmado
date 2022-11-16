from .db import db

class Section(db.Model):
  __tablename__ = "sections"

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(50), nullable = False)
  board_idx = db.Column(db.Integer, nullable = False, default=0)
  created_at = db.Column(db.DateTime(timezone = True), nullable = False)
  updated_at = db.Column(db.DateTime(timezone = True), nullable = False)
  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable = False)

  tasks = db.relationship("Task", back_populates="sections")
  projects = db.relationship("Project", back_populates="sections")

  def to_dict(self):
    tasks = {task.id:task.to_dict() for task in self.tasks}
    return {
      "id": self.id,
      "title":self.title,
      "board_idx": self.board_idx,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      "project_id":self.project_id,
      # "tasks": tasks
      "tasks": [task.to_dict() for task in self.tasks] if self.tasks else []
    }
