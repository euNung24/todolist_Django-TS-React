from rest_framework import viewsets, serializers
from .models import Todolist

class  TodolistSerializer(serializers.ModelSerializer):
  date = serializers.DateField(input_formats=['%Y.%m.%d.'])
  class Meta:
    model = Todolist
    fields = ['id', 'todo', 'date', 'isFinished']

class TodoListViewSet(viewsets.ModelViewSet):
  queryset = Todolist.objects.all()
  serializer_class = TodolistSerializer
  
  def get_queryset(self):
    qs = super().get_queryset();

    input = self.request.query_params.get('date')
    if input:
       qs = qs.filter(date=input)
    return qs
