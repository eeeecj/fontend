from django.http.request import HttpRequest
from django.http.response import HttpResponseBase
from django.shortcuts import render
from django.http import HttpResponse
from . import models
from django.http import JsonResponse
import requests


# Create your views here.
def login(request):
    message = dict()
    message['message'] = 'hello'
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = models.User.objects.get(username=username)
        except:
            message["message"] = "username 不存在"
        return JsonResponse(message)

    return render(request, "login.html")


def checkName(request):
    message = dict()
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = models.User.objects.get(username=username)
            print(user)
        except:
            message["message"] = "username is not Exist"
        return JsonResponse(message)
    username = request.GET.get('username')
    print(username)
    try:
        user = models.User.objects.get(username=username)
    except:
        message["message"] = "username is not Exist"
    return JsonResponse(message)


def checkEmail(request):
    message = dict()
    if request.method == "POST":
        email = request.POST.get('email')
        try:
            email_r = models.User.objects.get(email=email)
        except:
            message["message"] = 'email is not Exist'
        return JsonResponse(message)


def Ajaxtest(request):
    return render(request, "Ajax封装.html")


def baidu_code(request):
    kw = request.GET.get("keyWord")
    cb = request.GET.get("cb")
    url = "http://suggestion.baidu.com/su?wd=" + kw + "&cb=" + cb
    r = requests.get(url)
    return HttpResponse(r.text)


def baidu(request):
    return render(request, "百度提示词.html")


def artTemplate(request):
    return render(request, "artTemplate模板.html")


def airSearch(request):
    return render(request, "天气信息查询.html")


def phoneTest(request):
    return render(request, "手机吉凶查询.html")

def phoneGet(request):
    url=request.GET.get("url")
    url+="?key="+request.GET.get('key')+"&phone="+request.GET.get("phone")
    print(url)
    r=requests.get(url)
    # json格式使用HttpResponse返回
    # 字典使用JsonResponse返回
    return HttpResponse(r.text)