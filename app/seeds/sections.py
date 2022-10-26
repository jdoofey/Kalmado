from app.models import db, Project, User, Section
from datetime import date
def seed_sections():
  section1 = Section(
    title = "Backlog",
    board_idx = 1,
    created_at = date.today(),
    updated_at = date.today(),
    project_id = 1
  )
  section2 = Section(
    title = "Open",
    board_idx = 2,
    created_at = date.today(),
    updated_at = date.today(),
    project_id = 1
  )
  section3 = Section(
    title = "In Progress",
    board_idx = 3,
    created_at = date.today(),
    updated_at = date.today(),
    project_id = 1
  )
  section4 = Section(
    title = "Completed",
    board_idx = 4,
    created_at = date.today(),
    updated_at = date.today(),
    project_id = 1
  )
  section5 = Section(
    title = "Backlog",
    board_idx = 1,
    created_at = date.today(),
    updated_at = date.today(),
    project_id = 2
  )
  section6 = Section(
    title = "Open",
    board_idx = 2,
    created_at = date.today(),
    updated_at = date.today(),
    project_id = 2
  )
  section7 = Section(
    title = "In Progress",
    board_idx = 3,
    created_at = date.today(),
    updated_at = date.today(),
    project_id = 2
  )
  section8 = Section(
    title = "Completed",
    board_idx = 4,
    created_at = date.today(),
    updated_at = date.today(),
    project_id = 2
  )

  db.session.add(section1)
  db.session.add(section2)
  db.session.add(section3)
  db.session.add(section4)
  db.session.add(section5)
  db.session.add(section6)
  db.session.add(section7)
  db.session.add(section8)


def undo_sections():
  db.session.execute('TRUNCATE sections RESTART IDENTITY CASCADE;')
  db.session.commit()

