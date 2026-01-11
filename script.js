// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.querySelector('nav').classList.toggle('menu-open');
});

// Close menu when clicking a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.querySelector('nav').classList.remove('menu-open');
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ===== ACTIVE NAVIGATION LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

function setActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    observer.observe(element);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
const typedTextElement = document.getElementById('typedText');
const phrases = [
    'Data Science & GeoAI Researcher',
    'Urban Planning Specialist',
    'Machine Learning Engineer',
    'Remote Sensing Expert'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after a short delay
setTimeout(typeEffect, 1500);

// ===== STATS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        const hasPlus = stat.textContent.includes('+');
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }, stepTime);
    });

    statsAnimated = true;
}

// Trigger stats animation when stats row is visible
const statsRow = document.querySelector('.stats-row');
if (statsRow) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsRow);
}

// ===== PARALLAX EFFECT FOR HERO =====
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===== SKILL TAGS HOVER EFFECT =====
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-2px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== CARD TILT EFFECT =====
const cards = document.querySelectorAll('.experience-card, .paper-card, .project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== PRELOADER (if needed) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== AUTO-SWAPPING CAROUSEL FOR SECTIONS =====
function initCarousel(gridSelector, intervalTime = 4000) {
    const grid = document.querySelector(gridSelector);
    if (!grid) return;

    const cards = Array.from(grid.children);
    if (cards.length <= 1) return;

    // Create carousel wrapper
    const carouselWrapper = document.createElement('div');
    carouselWrapper.className = 'carousel-wrapper';

    // Create carousel track
    const carouselTrack = document.createElement('div');
    carouselTrack.className = 'carousel-track';

    // Move cards to track
    cards.forEach(card => {
        card.classList.add('carousel-slide');
        carouselTrack.appendChild(card);
    });

    // Calculate visible cards based on screen width
    function getVisibleCards() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 769) return 2;
        return 1;
    }

    function getMaxIndex() {
        const visibleCards = getVisibleCards();
        return Math.max(0, cards.length - visibleCards);
    }

    // Create indicators based on actual slides
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';

    function updateIndicators() {
        indicators.innerHTML = '';
        const maxIndex = getMaxIndex();
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            indicators.appendChild(dot);
        }
    }

    // Create nav arrows
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-nav carousel-prev';
    prevBtn.innerHTML = '‹';
    prevBtn.setAttribute('aria-label', 'Previous slide');
    prevBtn.addEventListener('click', () => changeSlide(-1));

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-nav carousel-next';
    nextBtn.innerHTML = '›';
    nextBtn.setAttribute('aria-label', 'Next slide');
    nextBtn.addEventListener('click', () => changeSlide(1));

    // Assemble carousel
    carouselWrapper.appendChild(carouselTrack);
    carouselWrapper.appendChild(indicators);
    carouselWrapper.appendChild(prevBtn);
    carouselWrapper.appendChild(nextBtn);

    // Replace grid with carousel
    grid.parentNode.replaceChild(carouselWrapper, grid);

    let currentIndex = 0;
    let autoPlayInterval;
    let isHovered = false;

    function getSlideWidth() {
        const visibleCards = getVisibleCards();
        return 100 / visibleCards;
    }

    function updateSlide() {
        const slideWidth = getSlideWidth();
        carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        // Update dots
        const dots = indicators.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        const maxIndex = getMaxIndex();
        currentIndex = Math.min(index, maxIndex);
        updateSlide();
        resetAutoPlay();
    }

    function changeSlide(direction) {
        const maxIndex = getMaxIndex();
        currentIndex = currentIndex + direction;
        if (currentIndex < 0) currentIndex = maxIndex;
        if (currentIndex > maxIndex) currentIndex = 0;
        updateSlide();
        resetAutoPlay();
    }

    function autoPlay() {
        if (!isHovered) {
            const maxIndex = getMaxIndex();
            currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
            updateSlide();
        }
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(autoPlay, intervalTime);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Pause on hover
    carouselWrapper.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    carouselWrapper.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1); // Swipe left
            } else {
                changeSlide(-1); // Swipe right
            }
        }
    }

    // Handle resize
    window.addEventListener('resize', () => {
        const maxIndex = getMaxIndex();
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateIndicators();
        updateSlide();
    });

    // Initial setup
    updateIndicators();
    startAutoPlay();
}

// Initialize carousels when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousels for all screen sizes
    initCarousel('.experience-grid', 4000);
    initCarousel('.papers-grid', 5000);
    initCarousel('.projects-grid', 4000);
    initCarousel('.skills-grid', 3500);
});