$(function () {
    var lastScrollTop = 0;
    var $navbar = $('#mainNavbar');

    if (!$navbar.length) return;

    $(window).on('scroll', function () {
        var currentScroll = $(this).scrollTop();

        if (currentScroll > 80) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }

        if (currentScroll > lastScrollTop && currentScroll > 100) {
            $navbar.addClass('nav-hidden');
        } else {
            $navbar.removeClass('nav-hidden');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});

(function () {
    var video = document.getElementById('heroVideo');
    var toggleBtn = document.getElementById('videoToggle');

    if (!video || !toggleBtn) return;

    var pauseIcon = toggleBtn.querySelector('.icon-pause');
    var playIcon = toggleBtn.querySelector('.icon-play');

    toggleBtn.addEventListener('click', function () {
        if (video.paused) {
            video.play();
            pauseIcon.style.display = 'inline-flex';
            playIcon.style.display = 'none';
            toggleBtn.setAttribute('aria-label', 'Pause Video');
        } else {
            video.pause();
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'inline-flex';
            toggleBtn.setAttribute('aria-label', 'Play Video');
        }
    });
})();

document.querySelectorAll('.model-row-card').forEach(function (card) {
    var cardVideo = card.querySelector('.model-video');
    if (!cardVideo) return;

    card.addEventListener('mouseenter', function () {
        cardVideo.currentTime = 0;
        cardVideo.play();
    });

    card.addEventListener('mouseleave', function () {
        cardVideo.pause();
        cardVideo.currentTime = 0;
    });
});

(function () {
    var section = document.getElementById('models');
    if (!section) return;
    var heading = section.querySelector('.section-header h2');
    var page = document.documentElement;
    var body = document.body;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function updateJourneyColors() {
        var rect = section.getBoundingClientRect();
        var viewportHeight = window.innerHeight;
        // Distance (in px) over which each fade happens. Tied to viewport
        // height so it scales naturally on any screen size.
        var fadeDistance = viewportHeight * 0.65;

        // 0 -> 1 as the section's top edge rises from the bottom of the
        // viewport towards the top (the "fade to black" entry).
        var entry = clamp((viewportHeight - rect.top) / fadeDistance, 0, 1);

        // 0 -> 1 as the section's bottom edge rises from the bottom of the
        // viewport towards the top (the "fade to white" exit).
        var exit = clamp((viewportHeight - rect.bottom) / fadeDistance, 0, 1);

        // Trapezoid: white while approaching, black through the middle,
        // white again while leaving.
        var progress = clamp(entry - exit, 0, 1);

        var shade = Math.round(255 - (255 * progress));
        var bg = 'rgb(' + shade + ',' + shade + ',' + shade + ')';
        var textShade = 255 - shade;
        var textColor = 'rgb(' + textShade + ',' + textShade + ',' + textShade + ')';

        // Whole-page background, not just this section's own box.
        body.style.backgroundColor = bg;
        page.style.backgroundColor = bg;
        if (heading) heading.style.color = textColor;
    }

    var ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
            updateJourneyColors();
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateJourneyColors();
})();

$(document).ready(function () {

    $('a[href^="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: target.offset().top - 80 }, 750);
        }
    });

    $('#menuBtn').click(function () {
        $('#megaMenu').addClass('show');
        $('body').css('overflow', 'hidden');
    });

    $('.close-menu').click(function () {
        $('#megaMenu').removeClass('show');
        $('body').css('overflow', '');
    });

    $(document).keydown(function (e) {
        if (e.key === 'Escape') {
            $('#megaMenu').removeClass('show');
            $('body').css('overflow', '');
        }
    });

    $('.model-card').mouseenter(function () {
        $(this).addClass('shadow-lg');
    }).mouseleave(function () {
        $(this).removeClass('shadow-lg');
    });
});

$(window).scroll(function () {
    if ($(window).scrollTop() > 80) {
        $('.custom-navbar').addClass('scrolled');
    } else {
        $('.custom-navbar').removeClass('scrolled');
    }
});

$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    $('.hero-video').css({
        transform: 'scale(1.05) translateY(' + (scroll * 0.15) + 'px)'
    });
});

// $('body').append('<button id="backToTop" title="Back to Top"><i class="fas fa-arrow-up"></i></button>');
// $('#backToTop').css({
//     position: 'fixed',
//     right: '28px',
//     bottom: '28px',
//     width: '48px',
//     height: '48px',
//     display: 'none',
//     borderRadius: '50%',
//     background: '#fff',
//     color: '#000',
//     border: 'none',
//     boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
//     textAlign: 'center',
//     lineHeight: '48px',
//     cursor: 'pointer',
//     zIndex: '999',
//     fontSize: '16px',
//     transition: 'all 0.3s'
// });

// $(window).scroll(function () {
//     if ($(this).scrollTop() > 500) {
//         $('#backToTop').fadeIn();
//     } else {
//         $('#backToTop').fadeOut();
//     }
// });

// $(document).on('click', '#backToTop', function () {
//     $('html, body').animate({ scrollTop: 0 }, 700);
// });

// window.addEventListener('load', function () {
//     document.body.style.opacity = '1';
//     document.body.style.transition = 'opacity 0.5s ease';
// });

// window.addEventListener('beforeunload', function () {
//     document.body.style.opacity = '0';
// });

// var heroVideo = document.querySelector('video.hero-video');
// if (heroVideo) {
//     heroVideo.play();
// }

// /* ============================================================
//    main.js  — Porsche Taycan Page
//    ============================================================ */

//    $(document).ready(function () {

//     /* Smooth scroll for internal anchor links */
//     $('a[href^="#"]').on('click', function (e) {
//         const target = $(this.getAttribute('href'));
//         if (target.length) {
//             e.preventDefault();
//             $('html, body').stop().animate({
//                 scrollTop: target.offset().top - 80
//             }, 700, 'swing');
//         }
//     });


//     /* Auto-close mobile navbar after a link click */
//     $('.navbar-nav .nav-link').on('click', function () {
//         const toggler = $('.navbar-toggler');
//         if (toggler.is(':visible')) {
//             toggler.click();
//         }
//     });


//     /* Bootstrap carousel auto-interval */
//     const carouselEl = document.getElementById('taycanCarousel');
//     if (carouselEl) {
//         new bootstrap.Carousel(carouselEl, {
//             interval: 4000,
//             ride: 'carousel'
//         });
//     }

// });