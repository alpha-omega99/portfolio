"""
apps/core/urls.py
"""
from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    path("", views.home, name="home"),
    path("parcours/", views.about_detail, name="about"),
    path("services/", views.services_detail, name="services"),
]
