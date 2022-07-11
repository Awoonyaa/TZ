from os import name
from pickle import NONE
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
from datetime import *
from django.core.serializers import serialize
from json import loads


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def employees(request):
    jsone = serialize('json', Employee.objects.all()) #перевели из бд в строку
    objs = loads(jsone) #из строки в дикшинори
    es = list(map(lambda e : e["fields"], objs)) #мап берет функцию и список и применяет эту функцию к каждому элементу списка
                                                 #из того, что получилось, создается ленивая задумка, а list делает из нее список
    es = list(map(fixjson, es))
    js = JsonResponse(es, safe=False)
    return js

def fixjson(e):
    e["hireDate"] = fixdate(e["hireDate"])
    if  e["fireDate"] != None:
        e["fireDate"] = fixdate(e["fireDate"])
    e["stavka"] = dict()
    e["stavka"]["salary"] = e["salary"]
    e["stavka"]["fraction"] = e["fraction"]
    del e["salary"]
    del e["fraction"]
    return e

def fixdate(date):
    date = date[:-10].split("-")
    date.reverse()
    return ('.'.join(date))

def addemployee(request):
    if request.method == "POST":
        print(request.body)
        dic = loads(request.body)
        employee = Employee(name = dic['name'], companyName=dic['companyName'], positionName = dic['positionName'], hireDate=fixdate2(dic['hireDate']), fireDate=fixdate2(dic['fireDate']),
                           salary=dic['stavka']['salary'], fraction=dic['stavka']['fraction'], base = dic['base'], advance=dic['advance'], byHours=dic['byHours'])
        employee.save()
    jr = JsonResponse([], safe=False)
    return jr

def fixdate2(date):
    if date == None or date == '':
        return None
            
    date = date.split(".")
    date.reverse()
    date = ('-').join(date)
    return date+" 00:00"




