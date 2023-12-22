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
from config.settings import SIMPLE_JWT, GOOGLE_CLIENT_ID, API_URL

class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self):
        return "redirect-url"

def google_login(request):
  if request.method == "POST":
    GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
    id_token = json.loads(request.body)['id_token']
    response = requests.get(
      GOOGLE_ID_TOKEN_INFO_URL,
      params={'id_token': id_token}
    )

    if not response.ok:
      raise ValidationError('id_token is invalid.')

    data = response.json()
    audience = data['aud']

    if audience != GOOGLE_CLIENT_ID:
      raise ValidationError('Invalid audience.')

    if not User.objects.filter(email=data['email']).exists():
      user = User.objects.create(
        email = data["email"],
        username = data["email"],
      )
      user.set_password("1234qwer")
      user.save()

    user = User.objects.get(email=data['email'])

    set_token_url = API_URL + '/api/token/'
    token_data = requests.post(set_token_url, data={
      "username": user.username,
      "password": "1234qwer"
    })
    print(set_token_url)
    access_token = token_data.json()['access']
    refresh_token = token_data.json()['refresh']

    return JsonResponse({ 'user' : user.id, 'picture': data['picture'], 'name': data['name'], 'access_token': access_token, 'refresh_token': refresh_token }, status=201, safe=False)
