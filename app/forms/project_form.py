from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Project

def valid_title(form, field):
  title = field.data
  if len(title) > 40 or len(title) < 2:
    raise ValidationError('Project title must be between 2 and 40 characters.')

def valid_description(form, field):
  description = field.data
  if len(description) > 1000:
    raise ValidationError("Project description cannot be more than 1000 characters")

class ProjectForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), valid_title])
  description = StringField('Description', validators=[DataRequired(), valid_description])
