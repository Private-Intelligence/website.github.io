// ============================================
// EDITORIAL MODERNISM — Interactive Features
// ============================================

// Custom Cursor
const initCursor = () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    const animateFollower = () => {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;

        followerX += distX * 0.1;
        followerY += distY * 0.1;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    };

    animateFollower();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project, .skill-list li');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
};

// Smooth Scroll
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Navigation Scroll Effect
const initNavScroll = () => {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
};

// Scroll Reveal Animations
const initScrollReveal = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // Observe projects with stagger
    document.querySelectorAll('.project').forEach((project, index) => {
        project.style.transitionDelay = `${index * 0.1}s`;
        project.classList.add('reveal');
        observer.observe(project);
    });
};

// Hero Animation Delays
const initHeroAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-delay]');

    animatedElements.forEach(el => {
        const delay = el.getAttribute('data-delay');
        el.style.animationDelay = `${delay}ms`;
    });
};

// Project Image Parallax Effect
const initProjectParallax = () => {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        const image = project.querySelector('.project-image img');

        if (!image) return;

        project.addEventListener('mouseenter', (e) => {
            project.addEventListener('mousemove', handleParallax);
        });

        project.addEventListener('mouseleave', () => {
            project.removeEventListener('mousemove', handleParallax);
            image.style.transform = 'scale(1.05) translate(0, 0)';
        });

        function handleParallax(e) {
            const rect = project.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;

            image.style.transform = `scale(1.05) translate(${xPercent}px, ${yPercent}px)`;
        }
    });
};

// Text Scramble Effect (Optional)
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Mobile Menu Toggle
const initMobileMenu = () => {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Animate toggle button
        const spans = toggle.querySelectorAll('span');
        if (toggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.transform = 'rotate(-45deg) translate(0, 0)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        });
    });
};

// Add mobile menu styles
const addMobileMenuStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: fixed;
                top: 80px;
                right: 0;
                background: rgba(26, 26, 26, 0.98);
                backdrop-filter: blur(20px);
                width: 100%;
                padding: 2rem;
                gap: 2rem;
                animation: slideDown 0.3s ease;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .nav-link {
                font-size: 1.5rem;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(style);
};

// Page Load Animation
const initPageLoad = () => {
    // Add page-loaded class after a brief delay
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
};

// Magnetic Button Effect
const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
};

// Performance: Reduce motion for users who prefer it
const respectReducedMotion = () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }
};

// Initialize all features
const init = () => {
    // Check if device supports hover (desktop)
    const isDesktop = window.matchMedia('(hover: hover)').matches;

    if (isDesktop) {
        initCursor();
        initMagneticButtons();
        initProjectParallax();
    }

    initPageLoad();
    initSmoothScroll();
    initNavScroll();
    initScrollReveal();
    initHeroAnimations();
    initMobileMenu();
    addMobileMenuStyles();
    respectReducedMotion();
};

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Log creative message
console.log('%c✨ Welcome to changyu.ai ',
    'background: #c0c5ce; color: #0a1929; padding: 12px 24px; font-size: 16px; font-weight: bold; font-family: "Playfair Display", serif;'
);

console.log('%cBuilt with care using Editorial Modernism design principles',
    'color: #9fa5b0; font-size: 12px; font-family: "IBM Plex Mono", monospace;'
);
