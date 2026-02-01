from django.contrib import admin
from .models import PersonalInformation, About, Projects, Skills, Contact


@admin.register(PersonalInformation)
class PersonalInformationAdmin(admin.ModelAdmin):
    list_display = ('name_complete', 'email', 'phone')
    search_fields = ('name_complete', 'email')


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)


@admin.register(Projects)
class ProjectsAdmin(admin.ModelAdmin):
    list_display = ('title', 'link', 'id')
    list_filter = ('title',)
    search_fields = ('title', 'skill')
    readonly_fields = ('id',)


@admin.register(Skills)
class SkillsAdmin(admin.ModelAdmin):
    list_display = ('skill', 'num')
    list_filter = ('num',)
    search_fields = ('skill',)
    ordering = ('-num',)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('title', 'email', 'location')
    search_fields = ('title', 'email')
