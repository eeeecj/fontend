from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("checkName/", views.checkName, name="checkName"),
    path("checkEmail/", views.checkEmail, name="checkEmail"),
    path("Ajaxtest/", views.Ajaxtest, name="Ajaxtest"),
    path("baidu_code/", views.baidu_code, name="baidu_code"),
    path("baidu/", views.baidu,name="baidu"),
    path("artTemplate/",views.artTemplate,name="artTemplate"),
    path("airSearch/",views.airSearch,name="airSearch"),
    path("phoneTest/",views.phoneTest,name="phoneTest"),
    path("phoneGet/",views.phoneGet,name="phoneGet"),
]