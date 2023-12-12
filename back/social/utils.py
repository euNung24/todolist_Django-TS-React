import jwt
import json

from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

from config.settings import SIMPLE_JWT
from django.contrib.auth.models import User

def login_check(token):
    access_token = token
    payload = jwt.decode(access_token, SIMPLE_JWT['SIGNING_KEY'], algorithm=SIMPLE_JWT['ALGORITHM'])
    user_id = User.objects.get(id=payload['user_id'])
    return user_id
