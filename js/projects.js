document.addEventListener('DOMContentLoaded', function() {
    // Enhanced skill descriptions with more details
    // Skills data with descriptions and tools
const skillsData = {
    "Web Security": {
        icon: "shield-alt",
        description: "Expertise in securing web applications against common vulnerabilities like XSS, CSRF, SQL Injection, and more. Experience with security headers, CORS, and Content Security Policy (CSP).",
        tools: "OWASP Top 10, Burp Suite, OWASP ZAP, Nmap, Metasploit"
    },
    "Pen Testing": {
        icon: "bug",
        description: "Proficient in conducting penetration tests to identify and exploit security vulnerabilities in web applications, networks, and systems.",
        tools: "Kali Linux, Metasploit, Burp Suite, Nmap, Wireshark"
    },
    "Linux": {
        icon: "linux",
        description: "Extensive experience with Linux system administration, shell scripting, and security hardening.",
        tools: "Bash, SSH, Systemd, iptables, SELinux, Docker"
    },
    "JavaScript": {
        icon: "js",
        description: "Advanced knowledge of modern JavaScript (ES6+), including frameworks like React and Node.js.",
        tools: "React, Node.js, Express, Webpack, Babel, Jest"
    },
    "Python": {
        icon: "python",
        description: "Proficient in Python for automation, scripting, and backend development.",
        tools: "Django, Flask, NumPy, Pandas, Scikit-learn"
    },
    "Node.js": {
        icon: "node-js",
        description: "Experience in building scalable server-side applications using Node.js and related technologies.",
        tools: "Express, MongoDB, Mongoose, Socket.io, JWT"
    },
    "React": {
        icon: "react",
        description: "Proficient in building modern, responsive user interfaces with React and related libraries.",
        tools: "Redux, React Router, Styled Components, Material-UI"
    },
    "Docker": {
        icon: "docker",
        description: "Experience with containerization and orchestration using Docker and related tools.",
        tools: "Docker Compose, Docker Swarm, Kubernetes"
    },
    "Git": {
        icon: "git-alt",
        description: "Proficient in version control using Git and collaborative development workflows.",
        tools: "GitHub, GitLab, Bitbucket, Git Flow"
    },
    "AWS": {
        icon: "aws",
        description: "Experience with cloud services and infrastructure on Amazon Web Services.",
        tools: "EC2, S3, RDS, Lambda, IAM, CloudFormation"
    },
    "Networking": {
        icon: "network-wired",
        description: "Strong understanding of networking concepts, protocols, and security.",
        tools: "TCP/IP, DNS, HTTP/HTTPS, VPN, Firewalls"
    },
    "Kali Linux": {
        icon: "terminal",
        description: "Proficient in using Kali Linux for security testing and ethical hacking.",
        tools: "Metasploit, Wireshark, John the Ripper, Aircrack-ng"
    }
};

// DOM Elements
const skillInfo = document.querySelector('.skill-info');
const skillIcon = document.querySelector('.skill-icon i');
const skillName = document.querySelector('.skill-name');
const skillDescription = document.querySelector('.skill-description');
const skillTools = document.querySelector('.skill-tools');

// Initialize skill details
function updateSkillDetails(skill) {
    const data = skillsData[skill];
    if (!data) return;

    skillIcon.className = `fas fa-${data.icon}`;
    skillName.textContent = skill;
    skillDescription.textContent = data.description;
    skillTools.innerHTML = `<strong>Tools:</strong> ${data.tools}`;
    
    // Highlight active skill
    document.querySelectorAll('.planet, .mobile-skill-item').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.skill === skill) {
            el.classList.add('active');
        }
    });
}

// Handle planet click (desktop)
document.querySelectorAll('.planet').forEach(planet => {
    planet.addEventListener('click', (e) => {
        e.stopPropagation();
        const skill = planet.getAttribute('data-skill');
        updateSkillDetails(skill);
    });
});

// Handle mobile skill item click
document.querySelectorAll('.mobile-skill-item').forEach(item => {
    item.addEventListener('click', () => {
        const skill = item.getAttribute('data-skill');
        updateSkillDetails(skill);
        
        // Scroll to skill details on mobile
        document.querySelector('.skill-details').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    });
});

// Handle click outside to deselect
document.addEventListener('click', (e) => {
    if (!e.target.closest('.planet') && !e.target.closest('.mobile-skill-item')) {
        resetSkillDetails();
    }
});

// Reset skill details
function resetSkillDetails() {
    skillIcon.className = 'fas fa-globe';
    skillName.textContent = 'Select a Skill';
    skillDescription.textContent = 'Click or tap on any skill to see detailed information about it.';
    skillTools.textContent = '';
    
    // Remove active states
    document.querySelectorAll('.planet, .mobile-skill-item').forEach(el => {
        el.classList.remove('active');
    });
}

// Parallax effect for solar system
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 992) return; // Only on desktop
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const sun = document.querySelector('.sun');
    const orbit1 = document.querySelector('.orbit-1');
    const orbit2 = document.querySelector('.orbit-2');
    const orbit3 = document.querySelector('.orbit-3');
    
    if (sun && orbit1 && orbit2 && orbit3) {
        sun.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        orbit1.style.transform = `rotate(${x * 10}deg)`;
        orbit2.style.transform = `rotate(${-x * 15}deg)`;
        orbit3.style.transform = `rotate(${x * 20}deg)`;
    }
});

// Initialize with default state
resetSkillDetails();

// Add animation class after page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add animation delay to planets
    document.querySelectorAll('.planet').forEach((planet, index) => {
        planet.style.animationDelay = `${index * 0.1}s`;
    });
});

}); // Closing the DOMContentLoaded event listener