/**
 * static/js/animations.js - Version Optimisée
 */
window.addEventListener('load', () => { // On attend que TOUT soit chargé (images incluses)

    // 1. Préparation des classes (évite les bugs de délai)
    const targets = [
        { sel: '.sec-label, h2.sec-title, .proj, .sk-card', cls: 'reveal' },
        { sel: '.about-text, .bio-content', cls: 'reveal-left' },
        { sel: '.timeline, .contact-form-wrap', cls: 'reveal-right' }
    ];

    targets.forEach(t => {
        document.querySelectorAll(t.sel).forEach(el => el.classList.add(t.cls));
    });

    // 2. Intersection Observer (Le moteur d'animation)
    const revealOption = {
        threshold: 0.1, // Déclenche plus tôt
        rootMargin: "0px 0px -50px 0px" // Zone de détection
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animation unique
            }
        });
    }, revealOption);

    // 3. Lancement
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach(el => observer.observe(el));

    // 4. SÉCURITÉ : Force l'affichage si l'élément est déjà dans l'écran au chargement
    setTimeout(() => {
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 500);
});