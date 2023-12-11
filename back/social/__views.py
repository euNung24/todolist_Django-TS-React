# from rest_framework.views import APIView
# from api.mixins import ApiErrorsMixin, PublicApiMixin
# from auth.services import
# 
# import requests
# from django.conf import settings
# from django.core.exceptions import ValidationError
# 
# from django.http import HttpResponse
# 
# from rest_framework_jwt.settings import api_settings
# from rest_framework_jwt.compat import set_cookie_with_token
# 
# from users.models import User
# from users.services import user_record_login
# 
# 
# GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
# 
# def google_validate_id_token(*, id_token: str) -> bool:
#     response = requests.get(
#         GOOGLE_ID_TOKEN_INFO_URL,
#         params={'id_token': id_token}
#     )
# 
#     if not response.ok:
#         raise ValidationError('id_token is invalid.')
# 
#     audience = response.json()['aud']
# 
#     if audience != settings.GOOGLE_OAUTH2_CLIENT_ID:
#         raise ValidationError('Invalid audience.')
# 
#     return True
# 
# def jwt_login(*, response: HttpResponse, user: User) -> HttpResponse:
#     jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#     jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
# 
#     payload = jwt_payload_handler(user)
#     token = jwt_encode_handler(payload)
# 
#     if api_settings.JWT_AUTH_COOKIE:
#         set_cookie_with_token(response, api_settings.JWT_AUTH_COOKIE, token)
# 
#     user_record_login(user=user)
# 
#     return response
# 
# class UserInitApi(PublicApiMixin, ApiErrorsMixin, APIView):
#     class InputSerializer(serializers.Serializer):
#         email = serializers.EmailField()
#         first_name = serializers.CharField(required=False, default='')
#         last_name = serializers.CharField(required=False, default='')
# 
#     def post(self, request, *args, **kwargs):
#         id_token = request.headers.get('id_token')
#         google_validate_id_token(id_token=id_token)
# 
#         serializer = self.InputSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
# 
#         # We use get-or-create logic here for the sake of the example.
#         # We don't have a sign-up flow.
#         user, _ = user_get_or_create(**serializer.validated_data)
# 
#         response = Response(data=user_get_me(user=user))
#         response = jwt_login(response=response, user=user)
# 
#         return response
# 
