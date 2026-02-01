# Generated migration to add about_avatar field

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myprotfolio', '0006_alter_projects_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='about',
            name='about_avatar',
            field=models.URLField(blank=True, null=True),
        ),
    ]
