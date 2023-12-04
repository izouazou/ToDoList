from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),

    path('tasks/', views.task_operations, name="task_operations"),
    path('tasks/<str:pk>/', views.task_operation, name="task_operation"), 
]