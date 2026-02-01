"""
Django management command to populate database with fake data
Run: python manage.py populate_fake_data
"""
from django.core.management.base import BaseCommand
from myprotfolio.models import PersonalInformation, About, Projects, Skills


class Command(BaseCommand):
    help = 'Populates the database with fake data for testing'

    def handle(self, *args, **options):
        self.stdout.write('Populating database with fake data...')
        
        # Clear existing data (optional - comment out if you want to keep existing)
        PersonalInformation.objects.all().delete()
        About.objects.all().delete()
        Projects.objects.all().delete()
        Skills.objects.all().delete()
        
        # Create Personal Information
        personal_info = PersonalInformation.objects.create(
            name_complete="Mohammad H Issa",
            avatar="https://via.placeholder.com/400x400/6e31df/ffffff?text=MH",
            mini_about="Passionate backend developer with expertise in Python, Django, and building scalable web applications. I love solving complex problems and creating efficient solutions.",
            address="Your City, Country",
            phone="+1234567890",
            email="mohammad.issa@example.com",
            github="https://github.com/mohammadissa",
            linkedin="https://linkedin.com/in/mohammadissa",
            facebook="https://facebook.com/mohammadissa",
            instagram="https://instagram.com/mohammadissa",
            mycv="https://example.com/cv.pdf"
        )
        self.stdout.write(self.style.SUCCESS(f'✓ Created Personal Information: {personal_info.name_complete}'))
        
        # Create About
        about = About.objects.create(
            title="About Me",
            description1="I am a dedicated backend developer with over 5 years of experience in building robust web applications. My expertise lies in Python, Django, REST APIs, and database design.",
            description2="I enjoy working on challenging projects that require problem-solving and creative thinking. When I'm not coding, I love contributing to open-source projects and sharing knowledge with the developer community.",
            about_avatar="https://via.placeholder.com/500x500/8b5cf6/ffffff?text=About"
        )
        self.stdout.write(self.style.SUCCESS(f'✓ Created About: {about.title}'))
        
        # Create Projects
        projects_data = [
            {
                "title": "E-Commerce Platform",
                "skill": "Django, PostgreSQL, React, Docker",
                "description": "Full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
                "link": "https://github.com/example/ecommerce"
            },
            {
                "title": "REST API Service",
                "skill": "Django REST Framework, JWT, PostgreSQL",
                "description": "Scalable REST API with authentication, rate limiting, and comprehensive documentation.",
                "link": "https://github.com/example/api"
            },
            {
                "title": "Task Management App",
                "skill": "Django, SQLite, Bootstrap, AJAX",
                "description": "Collaborative task management application with real-time updates and team collaboration features.",
                "link": "https://github.com/example/tasks"
            },
            {
                "title": "Blog Platform",
                "skill": "Django, PostgreSQL, HTML/CSS, JavaScript",
                "description": "Modern blog platform with rich text editor, comments system, and SEO optimization.",
                "link": "https://github.com/example/blog"
            },
            {
                "title": "Analytics Dashboard",
                "skill": "Python, Django, Chart.js, PostgreSQL",
                "description": "Real-time analytics dashboard with data visualization and reporting features.",
                "link": "https://github.com/example/analytics"
            },
            {
                "title": "Social Media API",
                "skill": "Django REST Framework, Redis, Celery",
                "description": "Social media backend API with user feeds, notifications, and real-time updates.",
                "link": "https://github.com/example/social"
            }
        ]
        
        for project_data in projects_data:
            project = Projects.objects.create(**project_data)
            self.stdout.write(self.style.SUCCESS(f'✓ Created Project: {project.title}'))
        
        # Create Skills
        skills_data = [
            {"skill": "Python", "num": 90},
            {"skill": "Django", "num": 85},
            {"skill": "PostgreSQL", "num": 80},
            {"skill": "REST APIs", "num": 85},
            {"skill": "JavaScript", "num": 70},
            {"skill": "Git", "num": 85},
            {"skill": "Docker", "num": 75},
            {"skill": "Linux", "num": 80}
        ]
        
        for skill_data in skills_data:
            skill = Skills.objects.create(**skill_data)
            self.stdout.write(self.style.SUCCESS(f'✓ Created Skill: {skill.skill} ({skill.num}%)'))
        
        self.stdout.write(self.style.SUCCESS('\n✓ Successfully populated database with fake data!'))
        self.stdout.write(self.style.WARNING('\nNote: Project images will show placeholder. Add actual images through admin panel.'))
