// Mobile menu functionality with improved cross-page support
(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links a');
        const html = document.documentElement;
        
        // Check if elements exist
        if (!menuToggle || !navLinks) return;

        // Toggle mobile menu
        function toggleMenu() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body scroll
            if (navLinks.classList.contains('active')) {
                html.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            } else {
                html.style.overflow = '';
                document.body.style.overflow = '';
            }
            
            // Add/remove event listener for escape key
            if (navLinks.classList.contains('active')) {
                document.addEventListener('keydown', handleEscapeKey);
            } else {
                document.removeEventListener('keydown', handleEscapeKey);
            }
        }

        // Close menu when clicking on a nav link
        function closeMenu() {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        }

        // Handle escape key press
        function handleEscapeKey(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        }

        // Add click event to menu toggle
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Add click events to nav items
        navItems.forEach(item => {
            item.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Handle window resize
        function handleResize() {
            if (window.innerWidth > 768) {
                // Reset menu state on larger screens
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    html.style.overflow = '';
                    document.body.style.overflow = '';
                    document.removeEventListener('keydown', handleEscapeKey);
                }
            }
        }

        // Debounce resize events for better performance
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 100);
        });

        // Initialize menu state
        handleResize();
    });
})();
