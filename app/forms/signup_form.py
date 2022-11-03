from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')



def valid_first_name(form, field):
    first_name = field.data
    if len(first_name) < 2 or len(first_name) > 15:
        raise ValidationError("First name must be between 2 and 15 characters")
    special_chars = "!@#$%^&*)'(-_><}{]['|~`1234567890"
    if any(char in special_chars for char in first_name):
        raise ValidationError("First name must not include any numbers or special characters")

def valid_last_name(form, field):
    last_name = field.data
    if len(last_name) < 2 or len(last_name) > 15:
        raise ValidationError("Last name must be between 2 and 15 characters")
    special_chars = "!@#$%^&*)'(-_><}{]['|~`1234567890"
    if any(char in special_chars for char in last_name):
        raise ValidationError("Last name must not include any numbers or special characters")
def valid_password(form, field):
    password = field.data
    if len(password)<5 or len(password)>20:
        raise ValidationError("Password must be between 5 and 20 characters.")

class SignUpForm(FlaskForm):

    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), valid_password])
    first_name = StringField('first_name', validators=[DataRequired(), valid_first_name])
    last_name = StringField('last_name', validators=[DataRequired(), valid_last_name])
