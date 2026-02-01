from django.shortcuts import render
from django.http import Http404

from myprotfolio.models import About, PersonalInformation, Projects, Skills


def home_page(request):
    """
    Home page view displaying portfolio information
    """
    # Get first instance of each model (assuming single portfolio)
    myinfo = PersonalInformation.objects.first()
    myabout = About.objects.first()
    projects = Projects.objects.all().order_by("-id")[:12]  # Limit to 12 projects
    skills_list = Skills.objects.all().order_by("-num")
    
    context = {
        "info": [myinfo] if myinfo else [],  # Convert to list for template compatibility
        "about": [myabout] if myabout else [],
        "skills": projects,  # Projects are displayed in "My Work" section
        "know": skills_list
    }

    return render(request, 'home_page.html', context)