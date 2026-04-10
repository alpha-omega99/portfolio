/**
 * static/js/animations.js
 * Animations Scroll Reveal pour toutes les sections.
 */
alert()
$(document).ready(function() {

    /* Injection des styles d'animation */
    $('<style>').text(`
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .reveal-left {
            opacity: 0;
            transform: translateX(-40px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-left.visible {
            opacity: 1;
            transform: translateX(0);
        }
        .reveal-right {
            opacity: 0;
            transform: translateX(40px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-right.visible {
            opacity: 1;
            transform: translateX(0);
        }
    `).appendTo('head');

    /* Application des classes d'animation */
    $('.sec-label, h2.sec-title, .inner-title').addClass('reveal');
    $('.inner-subtitle').addClass('reveal');

    $('.tl-item').each(function(i) {
        $(this).addClass('reveal').css('transition-delay', (i * 0.12) + 's');
    });

    $('.sk-card, .service-card-extended').each(function(i) {
        $(this).addClass('reveal').css('transition-delay', (i * 0.1) + 's');
    });

    $('.proj').each(function(i) {
        $(this).addClass('reveal').css('transition-delay', (i * 0.1) + 's');
    });

    $('.process-step').each(function(i) {
        $(this).addClass('reveal').css('transition-delay', (i * 0.12) + 's');
    });

    $('.skill-bar-item').each(function(i) {
        $(this).addClass('reveal').css('transition-delay', (i * 0.1) + 's');
    });

    $('.about-text, .contact-info, .bio-content').addClass('reveal-left');
    $('.timeline, .timeline-full, .contact-form-wrap').addClass('reveal-right');
    $('.contact-grid > div:first-child').addClass('reveal-left');
    $('.contact-grid > div:last-child').addClass('reveal-right');

    $('.stat').each(function(i) {
        $(this).addClass('reveal').css('transition-delay', (i * 0.15) + 's');
    });

    /* Fonction de déclenchement */
    function checkReveal() {
        const windowBottom = $(window).scrollTop() + $(window).height() * 0.92;
        $('.reveal, .reveal-left, .reveal-right').each(function() {
            if ($(this).offset().top < windowBottom) {
                $(this).addClass('visible');
            }
        });
    }

    $(window).on('scroll.reveal', checkReveal);
    checkReveal(); // Exécution immédiate pour les éléments déjà visibles

}); // end document ready