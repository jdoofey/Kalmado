from app.models import db, Project, User
from datetime import date

def seed_projects():
  user2= User.query.get(2)
  user3 = User.query.get(3)
  project1 = Project(
    title="Full Stack Web Application",
    description = "Create a full stack web application with 4 full CRUD features",
    created_at = date.today(),
    updated_at = date.today(),
    owner_id = 1
  )
  project1.members.append(user2)
  project1.members.append(user3)
  # shoutout to log(n)
  project2 = Project(
    title="React Project",
    description = "Create a react project to demonstrate your newly attained knowledge",
    created_at = date.today(),
    updated_at = date.today(),
    owner_id = 2
  )

  db.session.add(project1)
  db.session.add(project2)

  db.session.commit()

def undo_projects():
  db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
  db.session.commit()
