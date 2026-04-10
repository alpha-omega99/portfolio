/**
 * static/js/main.js
 * Fonctionnalités principales : loader, burger menu, header scroll,
 * smooth scroll, cursor personnalisé, back-to-top, flash messages.
 */
alert()
$(document).ready(function() {

    /* ─────────────────────────────────────────────────────────
        1. LOADER — écran de chargement
    ───────────────────────────────────────────────────────── */
    const $loader = $('<div id="loader"><div class="loader-inner"><div class="loader-brand"><span>&lt;</span>Alpha<span>/&gt;</span></div><div class="loader-bar-wrap"><div class="loader-bar"></div></div><div class="loader-pct">0%</div></div></div>');
    $('body').prepend($loader);

    const loaderStyle = `
        #loader {
            position: fixed; inset: 0; z-index: 9999;
            background: #0B1629;
            display: flex; align-items: center; justify-content: center;
            transition: opacity 0.6s ease;
        }
        .loader-inner { text-align: center; }
        .loader-brand {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 3rem; letter-spacing: 4px;
            color: #fff; margin-bottom: 2rem;
        }
        .loader-brand span { color: #2D6BE4; }
        .loader-bar-wrap {
            width: 240px; height: 2px;
            background: rgba(255,255,255,0.1);
            margin: 0 auto 1rem;
        }
        .loader-bar { height: 100%; width: 0; background: #2D6BE4; transition: width 0.05s linear; }
        .loader-pct { font-size: 12px; letter-spacing: .2em; color: #8A9BB8; }
    `;
    $('<style>').text(loaderStyle).appendTo('head');

    let pct = 0;
    const loaderInterval = setInterval(function() {
        pct += Math.floor(Math.random() * 8) + 3;
        if (pct >= 100) {
            pct = 100;
            clearInterval(loaderInterval);
        }
        $('.loader-bar').css('width', pct + '%');
        $('.loader-pct').text(pct + '%');
        if (pct === 100) {
            setTimeout(function() {
                $loader.css('opacity', 0);
                setTimeout(function() { $loader.remove(); }, 600);
            }, 300);
        }
    }, 60);


    /* ─────────────────────────────────────────────────────────
        2. BURGER MENU MOBILE
    ───────────────────────────────────────────────────────── */
    const $burger = $('#burger');
    const $mobileMenu = $('#mobile-menu');
    const $mobileLinks = $('.mobile-link');

    function openMenu() {
        $burger.addClass('open').attr('aria-expanded', 'true');
        $mobileMenu.addClass('open').attr('aria-hidden', 'false');
        $('body').css('overflow', 'hidden');
    }

    function closeMenu() {
        $burger.removeClass('open').attr('aria-expanded', 'false');
        $mobileMenu.removeClass('open').attr('aria-hidden', 'true');
        $('body').css('overflow', '');
    }

    $burger.on('click', function() {
        if ($burger.hasClass('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fermer le menu au clic sur un lien
    $mobileLinks.on('click', closeMenu);

    // Fermer avec la touche Échap
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $burger.hasClass('open')) closeMenu();
    });


    /* ─────────────────────────────────────────────────────────
       3. HEADER — shrink au scroll + lien actif
    ───────────────────────────────────────────────────────── */
    $(window).on('scroll.header', function() {
        const scrollTop = $(this).scrollTop();

        // Shrink
        if (scrollTop > 50) {
            $('#site-header').addClass('scrolled');
        } else {
            $('#site-header').removeClass('scrolled');
        }

        // Lien actif
        const pos = scrollTop + 120;
        $('section[id], .skills-wrap[id]').each(function() {
            const top = $(this).offset().top;
            const bottom = top + $(this).outerHeight();
            const id = $(this).attr('id');
            if (pos >= top && pos < bottom) {
                $('.nav-bar ul li a').removeClass('nav-active');
                $(`.nav-bar ul li a[href*="#${id}"]`).addClass('nav-active');
            }
        });
    });


    /* ─────────────────────────────────────────────────────────
        4. SMOOTH SCROLL
    ───────────────────────────────────────────────────────── */
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this).attr('href');
        if (!target || target === '#') return;
        const $target = $(target);
        if ($target.length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: $target.offset().top - 80 }, 700, 'swing');
        }
    });


    /* ─────────────────────────────────────────────────────────
        5. TYPEWRITER — hero eyebrow
    ───────────────────────────────────────────────────────── */
    const $tw = $('#typewriter-target');
    if ($tw.length) {
        const phrases = [
            'Développeur Web Frontend & Backend',
            'Solutions Digitales · Abidjan',
            'Autodidacte passionné du digital',
        ];
        let phraseIdx = 0,
            charIdx = 0,
            deleting = false;

        function typeWriter() {
            const current = phrases[phraseIdx];
            if (!deleting) {
                charIdx++;
                $tw.text(current.substring(0, charIdx));
                if (charIdx === current.length) {
                    deleting = true;
                    setTimeout(typeWriter, 1800);
                    return;
                }
            } else {
                charIdx--;
                $tw.text(current.substring(0, charIdx));
                if (charIdx === 0) {
                    deleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                }
            }
            setTimeout(typeWriter, deleting ? 45 : 75);
        }
        setTimeout(typeWriter, 1500);
    }


    /* ─────────────────────────────────────────────────────────
        6. COMPTEURS ANIMÉS (stats)
    ───────────────────────────────────────────────────────── */
    let countersDone = false;

    function animateCounter($el, target, suffix) {
        $({ count: 0 }).animate({ count: target }, {
            duration: 1600,
            easing: 'swing',
            step: function() { $el.text(Math.floor(this.count) + suffix); },
            complete: function() { $el.text(target + suffix); },
        });
    }

    function checkCounters() {
        if (countersDone) return;
        const $stats = $('.stats');
        if (!$stats.length) return;
        if ($(window).scrollTop() + $(window).height() > $stats.offset().top + 50) {
            countersDone = true;
            $('.stat-num[data-target]').each(function() {
                const target = parseInt($(this).data('target'), 10);
                const suffix = $(this).data('suffix') || '';
                animateCounter($(this), target, suffix);
            });
        }
    }

    $(window).on('scroll.counters', checkCounters);
    checkCounters();


    /* ─────────────────────────────────────────────────────────
        7. BARRES DE COMPÉTENCES
    ───────────────────────────────────────────────────────── */
    let barsDone = false;

    function checkBars() {
        if (barsDone) return;
        const $bars = $('.skill-bar-fill');
        if (!$bars.length) return;
        const $track = $('.skill-bar-track').first();
        if ($track.length && $(window).scrollTop() + $(window).height() > $track.offset().top + 30) {
            barsDone = true;
            $bars.each(function() {
                const w = $(this).data('width') || 0;
                $(this).css('width', w + '%');
            });
        }
    }

    $(window).on('scroll.bars', checkBars);
    checkBars();


    /* ─────────────────────────────────────────────────────────
        8. CURSOR PERSONNALISÉ (desktop seulement)
    ───────────────────────────────────────────────────────*/
    if (window.matchMedia('(hover: hover)').matches) {
        $('body').append('<div id="cursor"></div><div id="cursor-dot"></div>');

        let mouseX = 0,
            mouseY = 0,
            curX = 0,
            curY = 0;

        $(document).on('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            $('#cursor-dot').css({ left: mouseX, top: mouseY });
        });

        (function animateCursor() {
            curX += (mouseX - curX) * 0.15;
            curY += (mouseY - curY) * 0.15;
            $('#cursor').css({ left: curX, top: curY });
            requestAnimationFrame(animateCursor);
        })();

        $('a, button, .proj, .sk-card, .social-link').on('mouseenter', function() {
            $('#cursor').css({ transform: 'translate(-50%,-50%) scale(1.8)', borderColor: 'rgba(45,107,228,0.9)' });
        }).on('mouseleave', function() {
            $('#cursor').css({ transform: 'translate(-50%,-50%) scale(1)', borderColor: 'rgba(45,107,228,0.6)' });
        });
    }

    /* ─────────────────────────────────────────────────────────
        9. BACK TO TOP
    ───────────────────────────────────────────────────────── */
    $('body').append('<button id="back-top" title="Retour en haut" aria-label="Retour en haut">↑</button>');

    $(window).on('scroll.backtop', function() {
        if ($(this).scrollTop() > 400) {
            $('#back-top').addClass('show');
        } else {
            $('#back-top').removeClass('show');
        }
    });

    $(document).on('click', '#back-top', function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });


    /* ─────────────────────────────────────────────────────────
       10. FLASH MESSAGES — fermeture manuelle
    ───────────────────────────────────────────────────────── */
    $(document).on('click', '.flash-close', function() {
        $(this).closest('.flash-msg').fadeOut(300, function() { $(this).remove(); });
    });

    // Auto-fermeture après 6 secondes
    setTimeout(function() {
        $('.flash-msg').fadeOut(500, function() { $(this).remove(); });
    }, 6000);


    /* ─────────────────────────────────────────────────────────
       11. TOOLTIP sur les projets masqués
    ───────────────────────────────────────────────────────── */
    const $tooltip = $('<div class="proj-tooltip">Cliquer pour voir le projet</div>');
    $('body').append($tooltip);

    $('<style>').text(`
        .proj-tooltip {
            position: fixed; z-index: 600;
            background: #0F1E38; border: 1px solid rgba(45,107,228,0.3);
            color: #8A9BB8; font-size: 12px; padding: 6px 14px;
            pointer-events: none; opacity: 0;
            transition: opacity 0.2s; white-space: nowrap;
            border-radius: 3px;
        }
    `).appendTo('head');

    $('.proj-masked').on('mouseenter', function(e) {
        $tooltip.css({ top: e.clientY - 40, left: e.clientX + 16 }).animate({ opacity: 1 }, 150);
    }).on('mousemove', function(e) {
        $tooltip.css({ top: e.clientY - 40, left: e.clientX + 16 });
    }).on('mouseleave', function() {
        $tooltip.animate({ opacity: 0 }, 150);
    });

}); // end document ready