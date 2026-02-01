# CSRF Cookie Fix - Instructions

## Problem
Getting "CSRF cookie not set" error when trying to login to Django admin.

## Solution Applied

1. **Custom Middleware**: Added `EnsureCSRFCookieMiddleware` that forces CSRF cookie to be set on every request
2. **Updated Settings**: Configured CSRF cookie settings properly for development

## Steps to Fix

### 1. Restart Django Server
```bash
cd /home/asus/Documents/my_profile/myprotfolio
python manage.py runserver
```

### 2. Clear Browser Data
- Open Developer Tools (F12)
- Go to Application/Storage → Cookies
- Delete ALL cookies for `127.0.0.1` and `localhost`
- Clear browser cache (Ctrl+Shift+Delete)

### 3. Access Admin Login Page
1. Open a **NEW** browser tab/window (or use incognito mode)
2. Navigate to: `http://127.0.0.1:8000/admin/`
3. **Wait for the page to fully load** (this sets the CSRF cookie)
4. Try logging in

### 4. Verify CSRF Cookie
After visiting the admin page, check:
- Press F12 → Application/Storage → Cookies
- Look for a cookie named `csrftoken`
- If it's there, the fix is working!

## If Still Not Working

### Option 1: Use Incognito/Private Mode
- Open incognito window
- Go to `http://127.0.0.1:8000/admin/`
- Try logging in

### Option 2: Check Browser Settings
- Ensure cookies are enabled
- Disable ad blockers/privacy extensions temporarily
- Allow cookies for `127.0.0.1` and `localhost`

### Option 3: Verify URL Consistency
- Always use the SAME URL (either `127.0.0.1` OR `localhost`, not both)
- Don't switch between them

### Option 4: Check Console for Errors
- Press F12 → Console tab
- Look for any cookie-related errors
- Share any errors you see

## Technical Details

The custom middleware (`EnsureCSRFCookieMiddleware`) calls `get_token(request)` on every request, which forces Django to set the CSRF cookie in the response. This ensures the cookie is always available, even if templates don't explicitly use `{% csrf_token %}`.

## Files Modified

1. `myprotfolio/middleware.py` - New custom middleware
2. `mysite/settings.py` - Added middleware to MIDDLEWARE list, updated CSRF settings
