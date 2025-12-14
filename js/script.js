document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Typing effect in the terminal
    const texts = ['penetration testing', 'vulnerability assessment', 'web development', 'ethical hacking'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const typingElement = document.querySelector('.typing');
        
        if (count === texts.length) {
            count = 0;
        }
        
        currentText = texts[count];
        
        if (isDeleting) {
            letter = currentText.substring(0, index - 1);
            index--;
            typeSpeed = 50;
        } else {
            letter = currentText.substring(0, index + 1);
            index++;
            typeSpeed = 100;
        }
        
        if (typingElement) {
            typingElement.textContent = letter;
        }
        
        if (!isDeleting && letter === currentText) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && letter === '') {
            isDeleting = false;
            count++;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }

    // Start the typing effect
    if (document.querySelector('.typing')) {
        setTimeout(type, 1000);
    }

    // Glitch effect function with callback
    function triggerGlitchEffect(element) {
        if (!element) return;
        
        // Force reflow to ensure the class is properly removed
        element.classList.remove('glitch-active');
        void element.offsetWidth;
        
        // Add glitch class
        element.classList.add('glitch-active');
        
        // Remove glitch class after animation completes
        setTimeout(() => {
            element.classList.remove('glitch-active');
        }, 1000); // Match this with your CSS animation duration
    }

    // Smooth scrolling for anchor links with glitch effect for projects
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.startsWith('http')) return;
            
            e.preventDefault();
            
            // If it's a link to another page, navigate there
            if (targetId.endsWith('.html')) {
                window.location.href = targetId;
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Check if the target is the projects section
                const isProjectsSection = targetId === '#projects';
                
                // Scroll to the section
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Add glitch effect for projects section
                if (isProjectsSection) {
                    // Wait for scroll to complete
                    setTimeout(() => {
                        const projectsSection = document.getElementById('projects');
                        if (projectsSection) {
                            // Force a reflow before adding the class
                            void projectsSection.offsetWidth;
                            // Add the glitch class
                            triggerGlitchEffect(projectsSection);
                            
                            // Ensure the section is in view
                            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100); // Small delay to ensure smooth transition
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Active nav link highlighting
    function highlightNav() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = '#' + section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current || 
                (current === '#' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Call once on load

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, .about-content, .contact-container, .badge-card, .tryhackme-widget');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const elements = document.querySelectorAll('.project-card, .about-content, .contact-container, .badge-card, .tryhackme-widget');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    // Trigger initial animation check
    setTimeout(animateOnScroll, 500);
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) { // Only on desktop
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                const image = card.querySelector('.project-image');
                if (image) {
                    const moveX = (x - centerX) / 20;
                    const moveY = (y - centerY) / 20;
                    image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
                }
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) { // Only on desktop
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                const image = card.querySelector('.project-image');
                if (image) {
                    image.style.transform = 'translate(0, 0) scale(1)';
                }
            }
        });
    });
});
