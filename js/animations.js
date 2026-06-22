function revealOnScroll() {
    var reveals = document.querySelectorAll('.fade-up');
    var wh = window.innerHeight;

    reveals.forEach(function (el) {
        if (el.getBoundingClientRect().top < wh - 100) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

function revealModelRows() {
    var cards = document.querySelectorAll('.model-row-card');
    var wh = window.innerHeight;
    var delay = 0;

    cards.forEach(function (card) {
        var top = card.getBoundingClientRect().top;
        if (top < wh - 80 && !card.classList.contains('revealed')) {
            card.classList.add('revealed');
            card.style.transition = 'opacity 0.7s ease ' + delay + 's, transform 0.7s ease ' + delay + 's';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            delay += 0.12;
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.model-row-card').forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
    });
});

window.addEventListener('scroll', revealModelRows);
window.addEventListener('load', revealModelRows);

function countUpAnimation() {
    document.querySelectorAll('.count-number').forEach(function (counter) {
        var target = +counter.getAttribute('data-target');
        var step = target / 120;
        var count = 0;

        function update() {
            count += step;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(update, 16);
            } else {
                counter.innerText = target;
            }
        }

        update();
    });
}

var countStarted = false;

window.addEventListener('scroll', function () {
    var stats = document.querySelector('.stats-section');
    if (!stats) return;

    if (stats.getBoundingClientRect().top < window.innerHeight - 80 && !countStarted) {
        countUpAnimation();
        countStarted = true;
    }
});

window.addEventListener('load', function () {
    document.querySelectorAll('.feature-card').forEach(function (card, i) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.7s ease ' + (i * 0.15) + 's, transform 0.7s ease ' + (i * 0.15) + 's';

        setTimeout(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + i * 150);
    });
});

window.addEventListener('load', function () {
    var h1 = document.querySelector('.hero-content h1');
    var p = document.querySelector('.hero-content p');
    var btn = document.querySelector('.hero-btn');

    if (h1) h1.style.animation = 'heroTitle 1s ease forwards';
    if (p) {
        p.style.animation = 'heroText 1.2s ease .3s forwards';
        p.style.opacity = '0';
    }
    if (btn) {
        btn.style.animation = 'heroBtn 1.2s ease .6s forwards';
        btn.style.opacity = '0';
    }
});

window.addEventListener('scroll', function () {
    var img = document.querySelector('.performance-section img');
    if (!img) return;

    var scroll = window.pageYOffset;
    img.style.transform = 'scale(' + (1 + scroll * 0.00006) + ')';
});

/*  animations.js  — Porsche Taycan Page */

   document.addEventListener('DOMContentLoaded', () => {

    /* 1. NAVBAR — shrink on scroll */
    const navbar = document.querySelector('.custom-navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    /* 2. COUNT-UP NUMBERS (performance stats) */
    const countEls = document.querySelectorAll('.count-number');

    const runCount = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = 16;
        const increment = target / (duration / step);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, step);
    };

    // Trigger only when element enters viewport
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '0') {
                runCount(entry.target);
            }
        });
    }, { threshold: 0.4 });

    countEls.forEach(el => countObserver.observe(el));


    /* 3. MODEL CARDS — staggered slide-up entrance */
    const cards = document.querySelectorAll('.model-card');

    // Initial hidden state (applied via JS so no-JS users still see cards)
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.55s ease, transform 0.55s ease, box-shadow 0.35s ease';
    });

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const idx = Array.from(cards).indexOf(card);
                const delay = (idx % 3) * 100; // stagger within row

                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, delay);

                cardObserver.unobserve(card);
            }
        });
    }, { threshold: 0.12 });

    cards.forEach(card => cardObserver.observe(card));


    /* 4. MODEL CARDS — image parallax on mouse move */
    cards.forEach(card => {
        const img = card.querySelector('.model-card-img');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2; // -1 to 1
            const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;

            // Subtle tilt
            card.style.transform = `
                translateY(-4px)
                rotateX(${-y * 3}deg)
                rotateY(${x * 3}deg)
            `;
            card.style.transition = 'transform 0.1s ease';

            // Car image shifts slightly opposite direction (parallax)
            if (img) {
                img.style.transform = `scale(1.06) translate(${x * 6}px, ${y * 3}px)`;
                img.style.transition = 'transform 0.1s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease, opacity 0.55s ease';

            if (img) {
                img.style.transform = 'scale(1) translate(0, 0)';
                img.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });

        // Preserve perspective on parent for 3D
        card.style.perspective = '800px';
        const cardWrap = card.parentElement;
        if (cardWrap) cardWrap.style.perspective = '1200px';
    });

    // Inject ripple keyframe once
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes rippleEffect {
                to { transform: scale(2.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }


    /* 6. SECTION FADE-IN on scroll (hero content, overview, etc.) */
    const fadeEls = document.querySelectorAll(
        '.hero-content, .performance-section .performance-content, .gallery-section, .section-title'
    );

    fadeEls.forEach(el => {
        el.style.opacity = el.classList.contains('hero-content') ? '1' : '0';
        el.style.transform = el.classList.contains('hero-content') ? 'none' : 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fadeEls.forEach(el => {
        if (!el.classList.contains('hero-content')) fadeObserver.observe(el);
    });

});