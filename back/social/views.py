from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import RedirectView
import requests
from django.http import JsonResponse
import json
from django.contrib.auth.models import User
import jwt
from cmath import exp
from django.utils.timezone import now
from config.settings import SIMPLE_JWT

class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
#     callback_url = 'http://127.0.0.1:8000/google/login/callback'
#     callback_url = 'http://127.0.0.1:8000/accounts/google/login/callback'
#     callback_url = 'http://127.0.0.1:8080'
#     client_class = OAuth2Client

class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self):
        return "redirect-url"

def google_login(request):
  if request.method == "POST":
    GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
    GOOGLE_OAUTH2_CLIENT_ID = '246756656527-15h0r7veg0q4fcaqmbnmhdlo2s8j9ia3.apps.googleusercontent.com'
    id_token = json.loads(request.body)['id_token']
    response = requests.get(
      GOOGLE_ID_TOKEN_INFO_URL,
      params={'id_token': id_token}
    )

    if not response.ok:
      raise ValidationError('id_token is invalid.')

    data = response.json()
    audience = data['aud']

    if audience != GOOGLE_OAUTH2_CLIENT_ID:
      raise ValidationError('Invalid audience.')

    if not User.objects.filter(email=data['email']).exists():
      user = User.objects.create(
        email = data["email"],
        username = data["email"],
      )
      user.set_password("1234qwer")
      user.save()

    user = User.objects.get(email=data['email'])
    access_token = jwt.encode({'user_id': user.id,  'exp':now() + SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"]}, SIMPLE_JWT['SIGNING_KEY'], algorithm=SIMPLE_JWT["ALGORITHM"]).decode('utf-8')
    set_token_url = 'http://localhost:8000/api/token/'
    token_data = requests.post(set_token_url, data={
      "username": user.username,
      "password": "1234qwer"
    })
    access_token = token_data.json()['access']
    refresh_token = token_data.json()['refresh']

    return JsonResponse({ 'user' : user.id, 'access_token': access_token, 'refresh_token': refresh_token }, status=201, safe=False)
