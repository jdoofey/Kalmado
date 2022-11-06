from .db import db

task_assignees = db.Table("task_assignees", db.Model.metadata,
  db.Column('task_id', db.Integer, db.ForeignKey('tasks.id'), primary_key = True),
  db.Column('assignee_id', db.Integer, db.ForeignKey('users.id'), primary_key = True),
)


class Task(db.Model):
  __tablename__ = "tasks"

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(70))
  description = db.Column(db.String(300))
  status = db.Column(db.String(30))
  priority = db.Column(db.String(30))
  start_date = db.Column(db.DateTime(timezone = False))
  end_date = db.Column(db.DateTime(timezone = False))
  completed = db.Column(db.Boolean, default = False, nullable = False)
  created_at = db.Column(db.DateTime(timezone = True), nullable = False)
  updated_at = db.Column(db.DateTime(timezone = True), nullable = False)

  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  section_id = db.Column(db.Integer, db.ForeignKey("sections.id"), nullable = False)
  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable = False)

  assignees = db.relationship("User", secondary = task_assignees, back_populates="task_assignees")
  sections = db.relationship("Section", back_populates = "tasks")
  owner = db.relationship("User", back_populates = "tasks")
  ## TODO work on assignees relationship, may need join

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "status": self.status,
      "priority": self.priority,
      "section_id": self.section_id,
      "start_date": [None if not self.start_date else self.start_date],
      "end_date": [None if not self.end_date else self.end_date],
      "completed": self.completed,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      "project_id": self.project_id
    }
