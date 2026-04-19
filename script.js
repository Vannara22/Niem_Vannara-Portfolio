/* =============================================
   NIEM VANNARA PORTFOLIO — script.js
   ============================================= */

// ---- Dark / Light Mode Toggle ----
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ---- Mobile Navigation ----
const hamburger = document.getElementById('hamburger');
const navMenu   = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ---- Smooth Scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ---- Navbar scroll effect ----
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.boxShadow = window.scrollY > 60
        ? '0 2px 20px rgba(0,0,0,0.25)'
        : 'none';
});

// ---- Active nav link on scroll ----
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}
window.addEventListener('scroll', updateActiveNav);

// ---- Skills Tabs ----
const tabs   = document.querySelectorAll('.skills-tab');
const panels = document.querySelectorAll('.skills-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById(`tab-${tab.dataset.tab}`);
        if (panel) {
            panel.classList.add('active');
            // Animate skill bars in the new panel
            panel.querySelectorAll('.skill-progress').forEach(bar => {
                const target = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = target; }, 100);
            });
        }
    });
});

// ---- Skill bars animation on scroll ----
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                const target = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = target; }, 200);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-panel').forEach(panel => skillObserver.observe(panel));

// ---- Project Cards reveal on scroll ----
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                entry.target.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
            }, 80);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => projectObserver.observe(card));

// ---- Typing effect for hero name ----
window.addEventListener('load', () => {
    const highlight = document.querySelector('.hero-title .highlight');
    if (highlight) {
        const text = highlight.textContent;
        highlight.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                highlight.textContent += text[i++];
                setTimeout(type, 80);
            }
        };
        setTimeout(type, 600);
    }
});

// ---- Profile photo fallback ----
const profileImg     = document.getElementById('profileImg');
const avatarFallback = document.getElementById('avatarFallback');
if (profileImg) {
    profileImg.addEventListener('error', () => {
        profileImg.style.display = 'none';
        avatarFallback.style.display = 'flex';
    });
}

// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name    = this.name.value.trim();
        const email   = this.email.value.trim();
        const subject = this.subject.value.trim();
        const message = this.message.value.trim();

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error'); return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Please enter a valid email address.', 'error'); return;
        }
        showNotification('Message sent! I\'ll get back to you soon 🚀', 'success');
        this.reset();
    });
}

// ---- Notification system ----
function showNotification(message, type = 'success') {
    document.querySelector('.notification')?.remove();
    const n = document.createElement('div');
    n.className = `notification notification-${type}`;
    n.innerHTML = `<span>${message}</span><button class="notification-close">&times;</button>`;
    document.body.appendChild(n);
    n.querySelector('.notification-close').addEventListener('click', () => n.remove());
    setTimeout(() => n?.remove(), 5000);
}

// ---- Parallax (subtle) ----
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero && window.scrollY < window.innerHeight) {
        hero.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
    }
});

// ---- Console easter egg ----
console.log(
    '%c👋 Hey there! I\'m Niem Vannara\n%cData Science & Engineering Student @ RUPP\nLooking for internship opportunities!\n%c📧 Contact me through the portfolio',
    'color:#60a5fa;font-size:18px;font-weight:bold;',
    'color:#8b949e;font-size:13px;',
    'color:#4ade80;font-size:12px;'
);