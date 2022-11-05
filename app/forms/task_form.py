from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Task

def valid_title(form, field):
  title = field.data
  if len(title) > 50 or len(title) < 2:
    raise ValidationError("Task title must be between 2 and 50 characters")

def valid_description(form, field):
  description = field.data
  if len(description) > 1000:
    raise ValidationError("Task Description must be less than 1000 characters")

class TaskForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), valid_title])
  description = StringField('Description', validators=[DataRequired(), valid_description])
