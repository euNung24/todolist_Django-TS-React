from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
  TokenObtainPairView,
  TokenRefreshView,
  TokenVerifyView
)
from social import views

router = routers.DefaultRouter()

urlpatterns = [
  path('', include(router.urls)),
  path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
  path('token/refresh/',  TokenRefreshView.as_view(), name='token_refresh'),
  path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
