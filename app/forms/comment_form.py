from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def valid_body(form, field):
  body = field.data
  if len(body) > 250:
    raise ValidationError('Comment must be less than 250 characters')
  if len(body.strip()<1):
    raise ValidationError('Comment cannot be empty')

class CommentForm(FlaskForm):
  body = StringField('body', validators=[valid_body])
