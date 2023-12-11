from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import RedirectView

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
  if request.method == "GET":
    try:
      code = request.GET.get('code')
      state = request.GET.get('state')
      print(code)
      client_id = NAVER_CLIENT_ID
      client_secret = NAVER_CLIENT_SECRET
      redirectURI = NAVER_REDIRECT_URI
      # client_id = "aqEwWJTWavuAC54L91M3"
      # client_secret = "FCzmwMpf30"
      # redirectURI = "http://127.0.0.1:3000/accounts/naver/login/callback/"
      naver_token_api = 'https://nid.naver.com/oauth2.0/token'
      data = {
        'grant_type': "authorization_code",
        "client_id": client_id,
        "client_secret": client_secret,
        "code": code,
        "redirect_uri": redirectURI,
        "state": state
      }
      res  = requests.post(naver_token_api, data=data)
      data = res.json()
      token = data['access_token']
      headers = {
        'Authorization': "Bearer " + token
      }
      naver_info_url = "https://openapi.naver.com/v1/nid/me"
      info_data = requests.get(naver_info_url, headers = headers)
      naver_account = info_data.json()['response']
      print(token)
      if not User.objects.filter(email=naver_account["email"]).exists():
        user = User.objects.create(
          username = naver_account['id'],
          email = naver_account["email"],
        )
      user = User.objects.get(email=naver_account['email'])
      print(user.id)
      access_token = jwt.encode({'user_id': user.id,  'exp':now() + JWT_AUTH["JWT_EXPIRATION_DELTA"]}, JWT_AUTH['JWT_SECRET_KEY'], algorithm=JWT_AUTH["JWT_ALGORITHM"]).decode('utf-8')
      print(access_token)
      set_token_url = 'http://localhost:8000/api/rest-auth/naver/'
      token_data = requests.post(set_token_url, data={
        "access_token": token,
      })
      inner_token = token_data.json()['access_token']
      refresh_token = token_data.json()['refresh_token']

      print(token_data.json())
      return JsonResponse({'user': access_token, 'access_token': inner_token, 'refresh_token': refresh_token, 'is_superuser': user.is_superuser, 'id': user.id}, status=201, safe=False)

    except KeyError:
      return JsonResponse({'message': 'KEY_ERROR'}, status=400, safe=False)

    except JSONDecodeError:
      return JsonResponse({'message': 'JSON_DECODE_ERROR'}, status=400, safe=False)

    except jwt.DecodeError:
      return JsonResponse({'message': 'JWT_DECODE_ERROR'}, status=400, safe=False)

    except ConnectionError:
      return JsonResponse({'message': 'CONNECTION_ERROR'}, status=400, safe=False)
