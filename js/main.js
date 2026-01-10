/**
 * DREAMY JOURNAL - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initGalleryLightbox();
    initScrollRevel();
});

function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const menu = document.getElementById('mobile-menu');

    if (!menuBtn || !menu) return;

    menuBtn.addEventListener('click', () => {
        menu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        menu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Close on link click
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    });
}

function initGalleryLightbox() {
    const images = document.querySelectorAll('.cursor-zoom-in img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');

    if (!lightbox || !lightboxImg) return;

    images.forEach(img => {
        img.parentElement.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.replace('hidden', 'flex');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.replace('flex', 'hidden');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.replace('flex', 'hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

function initScrollRevel() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to sections and cards for a polished entry
    const animateElements = document.querySelectorAll('.glass-card, .day-card, section');
    animateElements.forEach((el, index) => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });
}

// Simple Log for Debugging
console.log('✨ Lumina Dreamy Journal Loaded Successfully ✨');
