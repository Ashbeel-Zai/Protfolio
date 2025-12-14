// Function to load navigation
function loadNavigation() {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // Configure the request
    xhr.open('GET', '/components/nav.html', true);
    
    // Set up the callback function
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            // Get the navigation element
            const navElement = document.querySelector('nav.navbar');
            if (navElement) {
                // Replace the navigation with the loaded content
                navElement.outerHTML = xhr.responseText;
                
                // Initialize mobile menu after loading
                initMobileMenu();
            }
        }
    };
    
    // Send the request
    xhr.send();
}

// Function to initialize mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (!menuToggle || !navLinks) return;

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Close menu when clicking on a nav link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Toggle menu on menu button click
    menuToggle.addEventListener('click', toggleMenu);
}

// Load navigation when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    loadNavigation();
});
