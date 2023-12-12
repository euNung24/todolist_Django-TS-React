import jwt
import json

from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

from config.settings import JWT_AUTH
from django.contrib.auth.models import User

def login_check(token):
    access_token = token
    payload = jwt.decode(access_token, JWT_AUTH['JWT_SECRET_KEY'], algorithm=JWT_AUTH['JWT_ALGORITHM'])
    user_id = User.objects.get(id=payload['user_id'])
    return user_id
