# Generated by Django 4.0.6 on 2022-07-10 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('awoo', '0003_rename_company_employee_companyname_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='fireDate',
            field=models.DateTimeField(null=True),
        ),
    ]
