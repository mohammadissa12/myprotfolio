"""
Custom middleware to ensure CSRF cookie is set on all requests.
This fixes the "CSRF cookie not set" error in Django admin.
"""
from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import get_token


class EnsureCSRFCookieMiddleware(MiddlewareMixin):
    """
    Middleware to ensure CSRF cookie is set on all requests.
    By calling get_token(), we force Django to set the CSRF cookie
    in the response, even if the template doesn't use {% csrf_token %}.
    """
    def process_request(self, request):
        # Force CSRF token to be generated, which will set the cookie
        # This ensures the cookie is always available
        get_token(request)
        return None
