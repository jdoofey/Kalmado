from app.models import db, Project, User, Section, Task
from datetime import date

def seed_tasks():
  user2= User.query.get(2)
  user3 = User.query.get(3)
  section3 = Section.query.get(3)
  section2 = Section.query.get(2)
  brandon1 = Task(
    title = "Work on models, relationships, and seeders",
    description = "Finish up the logic to get everything connected for front end testing and implementation",
    status = "On Track",
    priority = "Low",
    start_date = date.today(),
    end_date = date.today(),
    completed = False,
    created_at = date.today(),
    updated_at = date.today(),
    owner_id = 1,
    section_id = 3,
    project_id = 1
  )
  brandon1.assignees.append(user2)
  section3.tasks.append(brandon1)
  brandon2 = Task(
    title = "Finish API routes and connect to front-end React Components",
    description = "write out the api routes that will be used to connect front end to back end",
    status = "At Risk",
    priority = "High",
    start_date = date.today(),
    end_date = date.today(),
    completed = False,
    created_at = date.today(),
    updated_at = date.today(),
    owner_id = 2,
    section_id = 2,
    project_id = 2
  )
  brandon2.assignees.append(user3)
  section2.tasks.append(brandon2)

  brandon3 = Task(
    title = "Work redux store shape",
    description = "Manipulate data from back end to front end for convenient access in the redux store",
    status = "On Track",
    priority = "high",
    start_date = date.today(),
    end_date = date.today(),
    completed = False,
    created_at = date.today(),
    updated_at = date.today(),
    owner_id = 1,
    section_id = 3,
    project_id = 1
  )
  db.session.add(brandon1)
  db.session.add(brandon2)
  db.session.add(brandon3)

  db.session.commit()

def undo_tasks():
  db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
  db.session.commit()
