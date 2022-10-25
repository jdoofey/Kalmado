from .db import db

#business_tags = db.Table(
#    "business_tags",
#
#    db.Column("business_id", db.Integer, db.ForeignKey("businesses.id"), primary_key=True),
#    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"), primary_key=True)
#)

project_members = db.Table("project_members", db.Model.metadata,
  db.Column('project_id', db.Integer, db.ForeignKey('project.id'), primary_key = True),
  db.Column('member_id', db.Integer, db.ForeignKey('users.id'), primary_key = True)
  )
