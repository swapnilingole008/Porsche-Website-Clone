document.addEventListener('DOMContentLoaded', function () {
    var statsSection = document.getElementById('specs');
    if (!statsSection) return;

    var statRows = document.querySelectorAll('.macan-stat');
    var rowObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    statRows.forEach(function (row) {
        rowObserver.observe(row);
    });

    function runCounter(el) {
        var target = parseFloat(el.getAttribute('data-target'));
        var decimals = parseInt(el.getAttribute('data-decimal'), 10) || 0;
        var duration = 1600;
        var startTime = performance.now();

        function updateNumber(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var easeProgress = progress * (2 - progress);
            var currentValue = easeProgress * target;

            el.innerText = currentValue.toFixed(decimals);

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                el.innerText = target.toFixed(decimals);
            }
        }

        requestAnimationFrame(updateNumber);
    }

    var counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                document.querySelectorAll('.count-number').forEach(function (num) {
                    runCounter(num);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    counterObserver.observe(statsSection);
});

var mvOverlay = document.getElementById('mvOverlay');
var mvCloseBtn = document.getElementById('mvCloseBtn');
var openBtn = document.getElementById('changeVariantBtn');

function openPanel() {
    mvOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closePanel() {
    mvOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (openBtn) openBtn.addEventListener('click', openPanel);
if (mvCloseBtn) mvCloseBtn.addEventListener('click', closePanel);

if (mvOverlay) {
    mvOverlay.addEventListener('click', function (e) {
        if (e.target === mvOverlay) closePanel();
    });
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
});

var mvScrollArea = document.querySelector('.mv-scroll-area');
var mvCards = document.querySelectorAll('.mv-card');

if (mvScrollArea && mvCards.length) {
    var mvCardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('mv-visible');
                mvCardObserver.unobserve(entry.target);
            }
        });
    }, { root: mvScrollArea, threshold: 0.15 });

    mvCards.forEach(function (card) {
        mvCardObserver.observe(card);
    });
}
