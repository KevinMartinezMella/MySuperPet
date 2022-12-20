from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('acceder', views.acceder, name='acceder'),
    path('registro', views.registro, name='registro'),
    path('menu', views.menu, name='menu'),
]