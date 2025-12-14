// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00ff95'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 1,
                        sync: false
                    }
                },
                lineLinked: {
                    enable: true,
                    distance: 150,
                    color: '#00a8ff',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    outMode: 'bounce',
                    bounce: true,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detectOn: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        lineLinked: {
                            opacity: 0.8
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Add floating animation to info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.style.animation = `float 6s ease-in-out infinite`;
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-pulse');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Create ripple effect on button click
function createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    const rippleEffect = button.querySelector('.ripple');
    if (rippleEffect) {
        rippleEffect.remove();
    }

    button.appendChild(ripple);
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const submitText = submitButton.querySelector('span');
    const wave = submitButton.querySelector('.wave');
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitText.textContent = 'Sending...';
    wave.style.display = 'block';
    
    // In a real application, you would send the form data to a server here
    // For demonstration, we'll simulate a successful submission
    setTimeout(() => {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success';
        successMessage.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Message sent successfully! I'll get back to you soon.</span>
        `;
        
        // Insert success message after the form
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        
        // Animate the success message
        setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
        }, 10);
        
        // Reset form
        form.reset();
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitText.textContent = 'Send Message';
        wave.style.display = 'none';
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
    }, 1500);
}

// Add parallax effect to the background
window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const overlay = document.querySelector('.gradient-overlay');
    
    if (overlay) {
        overlay.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    }
});

// Add animation to form inputs on focus
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', (e) => {
        const parent = e.target.parentNode;
        parent.classList.add('focused');
    });
    
    input.addEventListener('blur', (e) => {
        const parent = e.target.parentNode;
        if (!e.target.value) {
            parent.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value) {
        input.parentNode.classList.add('focused');
    }
});
