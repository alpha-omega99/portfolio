/**
 * static/js/main.js - Vanilla JS
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- BURGER MENU ---
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
    }

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- CURSEUR ---
    if (window.matchMedia('(hover: hover)').matches) {
        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursor-dot');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseenter', () => {
            cursor.classList.add('visible');
            cursorDot.classList.add('visible');
        });
        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('visible');
            cursorDot.classList.remove('visible');
        });

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .proj')) cursor.classList.add('hover');
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .proj')) cursor.classList.remove('hover');
        });
    }
});