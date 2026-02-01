from django.db import models

class PersonalInformation(models.Model):
    name_complete = models.CharField(max_length=50, blank=True, null=True)
    avatar = models.URLField(blank=True, null=True)
    mini_about = models.TextField(blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)

    cv = models.FileField(upload_to='cv', blank=True, null=True)

    # Social Network
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    mycv = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "Personal Information"
        verbose_name_plural = "Personal Information"

    def __str__(self):
        return self.name_complete or "Personal Information"


class About(models.Model):
    title = models.CharField(max_length=20, blank=True, null=True)
    description1 = models.TextField(blank=False, null=True)
    description2 = models.TextField(blank=False, null=True)
    about_avatar = models.URLField(blank=True, null=True, help_text="URL to about section image")
    
    def __str__(self):
        return self.title or "About"

class Projects(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    skill = models.TextField(max_length=230, blank=True, null=True, help_text="Skills/technologies used")
    link = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ['-id']

    def __str__(self):
        return self.title or "Untitled Project"

class Contact(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=50, blank=True, null=True)
    msg = models.TextField(max_length=100, blank=True, null=True)
    #link = models.URLField(blank=True, null=True)
    #image = models.URLField(blank=True, null=True)

    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    #twitter = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class Skills(models.Model):
    skill = models.CharField(max_length=50, blank=True, null=True)
    num = models.IntegerField(blank=True, null=True, help_text="Skill percentage (0-100)")

    class Meta:
        verbose_name = "Skill"
        verbose_name_plural = "Skills"
        ordering = ['-num']

    def __str__(self):
        return self.skill or "Unnamed Skill"