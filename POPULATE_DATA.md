# How to Populate Fake Data

## Step 1: Run Migration (if not done already)
```bash
cd /home/asus/Documents/my_profile/myprotfolio
python manage.py migrate
```

## Step 2: Populate Fake Data
```bash
python manage.py populate_fake_data
```

This will create:
- ✅ Personal Information (name, email, social links, etc.)
- ✅ About section (title, descriptions, avatar)
- ✅ 6 Sample Projects
- ✅ 8 Skills with percentages

## Step 3: View Your Portfolio
Start your Django server:
```bash
python manage.py runserver
```

Then visit: `http://127.0.0.1:8000/`

## What Gets Created

### Personal Information
- Name: Mohammad H Issa
- Email, phone, address
- Social media links (GitHub, LinkedIn, Facebook, Instagram)
- Resume link

### About Section
- Title: "About Me"
- Two description paragraphs
- Avatar image URL

### Projects (6 items)
1. E-Commerce Platform
2. REST API Service
3. Task Management App
4. Blog Platform
5. Analytics Dashboard
6. Social Media API

### Skills (8 items)
- Python (90%)
- Django (85%)
- PostgreSQL (80%)
- REST APIs (85%)
- JavaScript (70%)
- Git (85%)
- Docker (75%)
- Linux (80%)

## Customizing Data

After running the command, you can:
1. Go to admin panel: `http://127.0.0.1:8000/admin/`
2. Edit any of the created entries
3. Add your own projects and skills
4. Update personal information

## Notes

- Project images will show placeholders - upload real images through admin
- All URLs are placeholder links - update them with your real links
- The command clears existing data - comment out the delete lines if you want to keep existing data
