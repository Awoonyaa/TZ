from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=20)
    companyName = models.CharField(max_length=20)
    positionName = models.CharField(max_length=30)
    hireDate = models.DateTimeField(null=True, blank = True)
    fireDate = models.DateTimeField(null=True, blank = True)
    salary = models.IntegerField()
    fraction = models.IntegerField()
    base = models.IntegerField()
    advance = models.IntegerField()
    byHours = models.BooleanField()

