# Generated by Django 4.1.3 on 2022-11-22 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myprotfolio', '0005_alter_projects_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projects',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]