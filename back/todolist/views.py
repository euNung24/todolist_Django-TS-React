from rest_framework import viewsets, serializers, authentication
from .models import Todolist
from rest_framework.response import Response
from social.utils import login_check

class  TodolistSerializer(serializers.ModelSerializer):
  date = serializers.DateField(input_formats=['%Y.%m.%d.'])
  class Meta:
    model = Todolist
    fields = ['id', 'todo', 'date', 'isFinished', 'owner']

class TodoListViewSet(viewsets.ModelViewSet):
  queryset = Todolist.objects.all()
  serializer_class = TodolistSerializer
  authentication_classes = [authentication.TokenAuthentication]

  def get_queryset(self):
    user_id = login_check(self.request.headers['Authorization'])
    qs = super().get_queryset().filter(owner=user_id)

    input = self.request.query_params.get('date')
    if input:
#        qs = qs.filter(owner=self.request.user.id).filter(date=input)
       qs = qs.filter(date=input)
    return qs

  def perform_create(self, serializer):
      user_id = login_check(self.request.headers['Authorization'])
      serializer.save(owner=user_id)
