/**
 * Modern Portfolio JavaScript
 * Enhanced with better performance and functionality
 */

(function($) {
    "use strict";

    // ===== PRELOADER =====
    $(window).on('load', function() {
        $('#preloader').addClass('hidden');
        setTimeout(function() {
            $('#preloader').remove();
        }, 500);
    });

    // ===== THEME TOGGLE =====
    const initThemeToggle = () => {
        const darkTheme = 'dark-theme';
        const selectedTheme = localStorage.getItem('selected-theme');

        // Apply saved theme on page load
        if (selectedTheme === 'light') {
            document.body.classList.add(darkTheme);
        } else {
            document.body.classList.remove(darkTheme);
        }

        // Theme toggle handler function
        const toggleTheme = function(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            const isCurrentlyLight = document.body.classList.contains(darkTheme);
            
            if (isCurrentlyLight) {
                // Switch to dark theme (remove light theme class)
                document.body.classList.remove(darkTheme);
                localStorage.setItem('selected-theme', 'dark');
                console.log('Switched to dark theme');
            } else {
                // Switch to light theme (add light theme class)
                document.body.classList.add(darkTheme);
                localStorage.setItem('selected-theme', 'light');
                console.log('Switched to light theme');
            }
        };

        // Wait for jQuery to be available, then bind events
        const bindThemeEvents = () => {
            if (typeof jQuery !== 'undefined') {
                // Use jQuery delegated event (works even if elements are added later)
                jQuery(document).off('click.theme', '#theme-button, #theme-button-mobile');
                jQuery(document).on('click.theme', '#theme-button, #theme-button-mobile', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleTheme(e);
                });
                
                // Also bind directly when elements exist
                jQuery('#theme-button, #theme-button-mobile').off('click.themeDirect').on('click.themeDirect', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleTheme(e);
                });
            }
        };
        
        // Try binding immediately and after delays
        if (typeof jQuery !== 'undefined') {
            bindThemeEvents();
        } else {
            // Wait for jQuery to load
            const checkJQuery = setInterval(() => {
                if (typeof jQuery !== 'undefined') {
                    clearInterval(checkJQuery);
                    bindThemeEvents();
                }
            }, 100);
            
            // Stop checking after 5 seconds
            setTimeout(() => clearInterval(checkJQuery), 5000);
        }
        
        // Also use vanilla JS
        setTimeout(bindThemeEvents, 100);
        setTimeout(bindThemeEvents, 500);
        
        // Also use vanilla JS as backup
        const attachVanillaListeners = () => {
            const themeButton = document.getElementById('theme-button');
            const themeButtonMobile = document.getElementById('theme-button-mobile');
            
            if (themeButton && !themeButton.dataset.listenerAttached) {
                themeButton.addEventListener('click', toggleTheme);
                themeButton.dataset.listenerAttached = 'true';
            }
            
            if (themeButtonMobile && !themeButtonMobile.dataset.listenerAttached) {
                themeButtonMobile.addEventListener('click', toggleTheme);
                themeButtonMobile.dataset.listenerAttached = 'true';
            }
        };

        // Try multiple times to ensure buttons are found
        attachVanillaListeners();
        setTimeout(attachVanillaListeners, 100);
        setTimeout(attachVanillaListeners, 500);
        setTimeout(attachVanillaListeners, 1000);
    };

    // ===== SMOOTH SCROLL =====
    const initSmoothScroll = () => {
        const scrolltoOffset = $('#header').outerHeight() - 16;
        const offset = window.matchMedia("(max-width: 991px)").matches ? scrolltoOffset + 16 : scrolltoOffset;

        $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
                location.hostname == this.hostname) {
                e.preventDefault();
                const target = $(this.hash);
                
                if (target.length) {
                    let scrollto = target.offset().top - offset;
                    
                    if ($(this).attr("href") == '#header') {
                        scrollto = 0;
                    }

                    $('html, body').animate({
                        scrollTop: scrollto
                    }, 800, 'easeInOutExpo');

                    // Update active nav item
                    if ($(this).parents('.nav-menu, .mobile-nav').length) {
                        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                        $(this).closest('li').addClass('active');
                    }

                    // Close mobile menu if open
                    if ($('body').hasClass('mobile-nav-active')) {
                        $('body').removeClass('mobile-nav-active');
                        $('.mobile-nav-toggle').removeClass('active');
                        $('.mobile-nav-overly').fadeOut();
                    }
                    
                    return false;
                }
            }
        });
    };

    // ===== MOBILE NAVIGATION =====
    const initMobileNav = () => {
        if ($('.nav-menu').length) {
            const $mobile_nav = $('.nav-menu').clone().prop({
                class: 'mobile-nav d-lg-none'
            });
            
            $('body').append($mobile_nav);
            $('body').append('<div class="mobile-nav-overly"></div>');

            $(document).on('click', '.mobile-nav-toggle, #mobileNavToggle', function(e) {
                e.preventDefault();
                const $body = $('body');
                const $toggle = $(this);
                const $overlay = $('.mobile-nav-overly');
                const $mobileNav = $('.mobile-nav');
                
                $body.toggleClass('mobile-nav-active');
                $toggle.toggleClass('active');
                $mobileNav.toggleClass('active');
                
                if ($body.hasClass('mobile-nav-active')) {
                    $overlay.fadeIn(300);
                } else {
                    $overlay.fadeOut(300);
                }
            });

            $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
                e.preventDefault();
                $(this).next().slideToggle(300);
                $(this).parent().toggleClass('active');
            });

            $(document).on('click', '.mobile-nav-overly', function() {
                $('body').removeClass('mobile-nav-active');
                $('.mobile-nav-toggle, #mobileNavToggle').removeClass('active');
                $('.mobile-nav').removeClass('active');
                $(this).fadeOut(300);
            });
        }
    };

    // ===== NAVBAR SCROLL EFFECT =====
    const initNavbarScroll = () => {
        $(window).on('scroll', function() {
            const $nav = $(".navbur");
            const scrollTop = $(this).scrollTop();
            
            if (scrollTop > 50) {
                $nav.addClass('scrolled');
            } else {
                $nav.removeClass('scrolled');
            }
        });
    };

    // ===== ACTIVE NAVIGATION ON SCROLL =====
    const initActiveNavOnScroll = () => {
        const sections = $('section[id], footer[id]');
        const navLinks = $('.nav-menu a, .mobile-nav a');

        $(window).on('scroll', function() {
            const scrollPos = $(window).scrollTop() + 100;

            sections.each(function() {
                const top = $(this).offset().top;
                const bottom = top + $(this).outerHeight();
                const id = $(this).attr('id');

                if (scrollPos >= top && scrollPos <= bottom) {
                    navLinks.removeClass('active');
                    navLinks.filter('[href="#' + id + '"]').addClass('active');
                }
            });
        });
    };

    // ===== SCROLL TO TOP BUTTON =====
    const initScrollToTop = () => {
        const scrollBtn = $('#scrollToTop');
        
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                scrollBtn.addClass('visible');
            } else {
                scrollBtn.removeClass('visible');
            }
        });

        scrollBtn.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800, 'easeInOutExpo');
        });
    };

    // ===== SKILL BARS ANIMATION =====
    const initSkillBars = () => {
        const skillBars = $('.skill-progress');
        let animated = false;

        const animateSkills = () => {
            if (animated) return;
            
            skillBars.each(function() {
                const $this = $(this);
                const width = $this.data('width') || $this.attr('data-width') || $this.css('width');
                $this.css('width', '0');
                
                setTimeout(() => {
                    $this.css('width', width + '%');
                }, 100);
            });
            
            animated = true;
        };

        // Check if skills section is in viewport
        const checkSkillsVisibility = () => {
            const skillsSection = $('#skills');
            if (skillsSection.length) {
                const elementTop = skillsSection.offset().top;
                const elementBottom = elementTop + skillsSection.outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    animateSkills();
                }
            }
        };

        $(window).on('scroll', checkSkillsVisibility);
        checkSkillsVisibility(); // Check on load
    };

    // ===== CURRENT YEAR =====
    const setCurrentYear = () => {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    // ===== AOS INITIALIZATION =====
    const initAOS = () => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-in-out',
                delay: 0
            });
        }
    };

    // ===== PROJECT CARD HOVER EFFECT =====
    const initProjectCards = () => {
        $('.project-card').each(function() {
            $(this).on('mouseenter', function() {
                $(this).find('.project-overlay').css('opacity', '1');
            }).on('mouseleave', function() {
                $(this).find('.project-overlay').css('opacity', '0');
            });
        });
    };

    // ===== LAZY LOADING IMAGES =====
    const initLazyLoading = () => {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback for browsers that don't support native lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
    };

    // ===== PERFORMANCE OPTIMIZATION =====
    const initPerformanceOptimizations = () => {
        // Debounce scroll events
        let scrollTimeout;
        const originalScrollHandler = $(window).data('events')?.scroll;
        
        $(window).on('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(function() {
                // Scroll handlers here
            }, 10);
        });
    };

    // ===== INITIALIZE ALL FUNCTIONS =====
    // Initialize theme toggle immediately to prevent flash
    initThemeToggle();
    
    $(document).ready(function() {
        // Ensure theme toggle is initialized
        initThemeToggle();
        initSmoothScroll();
        initMobileNav();
        initNavbarScroll();
        initActiveNavOnScroll();
        initScrollToTop();
        initSkillBars();
        initAOS();
        initProjectCards();
        setCurrentYear();
        initLazyLoading();
        
        // Set initial active nav item
        if ($(window).scrollTop() < 100) {
            $('.nav-menu a[href="#home"]').addClass('active');
        }
    });

    // ===== WINDOW LOAD HANDLER =====
    $(window).on('load', function() {
        // Additional initialization after all resources are loaded
        initSkillBars();
    });

})(jQuery);

// ===== VANILLA JS ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add loading="lazy" to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        if (!img.closest('.hero-image, .about-image')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // Improve form accessibility
    const buttons = document.querySelectorAll('button, a.btn');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label') && btn.textContent.trim()) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });
});
