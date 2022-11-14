from .db import db

task_comments = db.Table('task_comments',
  db.Column("task_id", db.Integer, db.ForeignKey("tasks.id"), primary_key = True),
  db.Column("comment_id", db.Integer, db.ForeignKey("comments.id"), primary_key = True)
)

class Comment(db.Model):
  __tablename__ = "comments"

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  body = db.Column(db.String(3000), nullable = False)
  created_at = db.Column(db.DateTime(timezone = True), nullable = False)
  updated_at = db.Column(db.DateTime(timezone = True), nullable = False)

  task_comments = db.relationship("Task", secondary = task_comments, back_populates = "comments")
  owner = db.relationship("User", back_populates="comments")

  def to_dict(self):
    return {
      'id':self.id,
      'user_id':self.user_id,
      'body':self.body,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
