# Generated by Django 4.1.3 on 2022-11-22 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myprotfolio', '0003_alter_projects_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projects',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
