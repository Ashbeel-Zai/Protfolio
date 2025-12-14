// Warning messages
const WARNING_MESSAGES = [
    "WARNING: FEDERAL CYBERSECURITY ALERT",
    "UNAUTHORIZED ACCESS DETECTED",
    "SECURITY BREACH IMMINENT",
    "CRITICAL SYSTEM ALERT",
    "NETWORK INTRUSION DETECTED",
    "SECURE CONNECTION REQUIRED"
];

const WARNING_DESCRIPTIONS = [
    "Accessing secured network... Verifying credentials...",
    "Initializing secure connection protocol...",
    "Encrypting data transmission... Stand by...",
    "Security protocols engaged... Proceeding...",
    "Authentication sequence initiated...",
    "Establishing secure channel... Please wait..."
];

// Matrix characters
const CHARS = "01";

// Create matrix rain effect
function createMatrixRain() {
    const container = document.createElement('div');
    container.className = 'matrix-rain';
    
    // Create multiple columns of falling characters
    for (let i = 0; i < 50; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-char';
        column.style.left = `${Math.random() * 100}%`;
        column.style.animationDuration = `${3 + Math.random() * 5}s`;
        column.style.animationDelay = `${Math.random() * 2}s`;
        column.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        container.appendChild(column);
    }
    
    return container;
}

// Get random warning message
function getRandomWarning() {
    const randomIndex = Math.floor(Math.random() * WARNING_MESSAGES.length);
    return {
        title: WARNING_MESSAGES[randomIndex],
        desc: WARNING_DESCRIPTIONS[randomIndex % WARNING_DESCRIPTIONS.length]
    };
}

// Page transition handler
document.addEventListener('DOMContentLoaded', function() {
    // Create transition overlay if it doesn't exist
    let overlay = document.querySelector('.transition-overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        
        // Create matrix background
        const matrixBg = document.createElement('div');
        matrixBg.className = 'matrix-bg';
        
        // Add matrix rain
        const matrixRain = createMatrixRain();
        matrixBg.appendChild(matrixRain);
        
        // Add warning container
        const warning = getRandomWarning();
        overlay.innerHTML = `
            <div class="warning-container">
                <div class="warning-title">${warning.title}</div>
                <div class="warning-message">${warning.desc}</div>
                <div class="terminal-text">
                    <span class="prompt">$</span> <span class="loading-text">Initializing secure connection</span><span class="page-name"></span>
                </div>
            </div>
        `;
        
        // Add matrix background to overlay
        overlay.prepend(matrixBg);
        document.body.appendChild(overlay);
    }

    // Set initial state
    if (sessionStorage.getItem('transitioning') === 'true') {
        const warning = getRandomWarning();
        const warningContainer = overlay.querySelector('.warning-container');
        if (warningContainer) {
            warningContainer.querySelector('.warning-title').textContent = warning.title;
            warningContainer.querySelector('.warning-message').textContent = warning.desc;
        }
        
        overlay.classList.add('active');
        setTimeout(() => {
            overlay.classList.add('complete');
            setTimeout(() => {
                overlay.classList.remove('active', 'complete');
            }, 1000);
        }, 100);
        sessionStorage.removeItem('transitioning');
    } else {
        overlay.classList.remove('active', 'complete');
    }

    // Handle navigation clicks
    function handleNavigation(e) {
        const href = this.getAttribute('href');
        
        // Skip external links, mailto, and anchor links
        if ((this.hostname && this.hostname !== window.location.hostname) || 
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:')) {
            return true;
        }
        
        e.preventDefault();
        const pageName = this.textContent.trim() || 'page';
        
        // Update loading text
        const loadingText = overlay.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = `Loading ${pageName.toLowerCase()}...`;
        }
        
        // Update warning message
        const warning = getRandomWarning();
        const warningContainer = overlay.querySelector('.warning-container');
        if (warningContainer) {
            warningContainer.querySelector('.warning-title').textContent = warning.title;
            warningContainer.querySelector('.warning-message').textContent = warning.desc;
        }
        
        // Start transition
        overlay.classList.remove('complete');
        void overlay.offsetWidth; // Trigger reflow
        overlay.classList.add('active');
        
        // Navigate after animation completes
        setTimeout(() => {
            sessionStorage.setItem('transitioning', 'true');
            window.location.href = href;
        }, 1500); // Increased delay for better visibility of warning
    }

    // Add click event to all navigation links
    document.querySelectorAll('a').forEach(link => {
        // Remove existing listeners to prevent duplicates
        link.removeEventListener('click', handleNavigation);
        // Add new listener
        link.addEventListener('click', handleNavigation);
    });

    // Set transitioning flag before unload
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('transitioning', 'true');
    });

    // Add continuous animation to matrix rain
    function updateMatrixRain() {
        const chars = document.querySelectorAll('.matrix-char');
        chars.forEach(char => {
            if (Math.random() > 0.95) {
                char.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
        });
        requestAnimationFrame(updateMatrixRain);
    }
    
    // Start matrix animation
    updateMatrixRain();
});
