/**
 * static/js/main.js - Version Vanilla JS Robuste
 */
document.addEventListener('DOMContentLoaded', () => {

    // 1. LOADER (Simplifié pour éviter les blocages)
    const loader = document.getElementById('loader') || document.createElement('div');
    if (!document.getElementById('loader')) {
        loader.id = 'loader';
        loader.innerHTML = '<div class="loader-inner"><div class="loader-bar-wrap"><div class="loader-bar"></div></div><div class="loader-pct">0%</div></div>';
        document.body.prepend(loader);
    }

    let pct = 0;
    const bar = loader.querySelector('.loader-bar');
    const txt = loader.querySelector('.loader-pct');

    const loadInt = setInterval(() => {
        pct += Math.floor(Math.random() * 15);
        if (pct >= 100) {
            pct = 100;
            clearInterval(loadInt);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 600);
            }, 200);
        }
        if (bar) bar.style.width = pct + '%';
        if (txt) txt.textContent = pct + '%';
    }, 50);

    // 2. MENU BURGER
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            const open = burger.classList.toggle('open');
            mobileMenu.classList.toggle('open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
    }

    // 3. CURSEUR (Plus fluide)
    if (window.matchMedia('(hover: hover)').matches) {
        const cursor = document.createElement('div');
        cursor.id = 'cursor';
        document.body.append(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });

        document.querySelectorAll('a, button, .proj').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
});