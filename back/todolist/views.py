# from dataclasses import field, fields
# from django.shortcuts import render
from rest_framework import viewsets, serializers

from .models import Todolist

class  TodolistSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todolist
    fields = ('todo', 'date', 'isFinished')

class TodoListViewSet(viewsets.ModelViewSet):
  queryset = Todolist.objects.all()
  serializer_class = TodolistSerializer