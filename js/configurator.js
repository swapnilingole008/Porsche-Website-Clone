/* STATE */
var state = {
    basePrice:    12162000,
    colorAdd:     0,       colorName: 'White',
    wheelAdd:     0,       wheelName: 'Standard 20-inch',
    interiorAdd:  0,       interiorName: 'Black Standard',
    packagesAdd:  0,
    currentImg:   document.getElementById('mainCarImg').src
};

var CDN_IMG_A = 'https://prs.porsche.com/iod/image/IN/XABAA1/1/N4Igxg9gdgZglgcxALlAQynAtmgLnaAZxQG0BdAGnDSwFMAnNFUOAExRFoA9cBaAGwgB3XjHrQ+-WjFwgqEAA74izEADc09OBlnIQrWoQDWuRSAC+5qrShq44qHSi6W7PQFV6AIwwBZNGAYciCKylDEqJZU-IgAFvhQSKggbBwAIgCCAJrBoQThzFEgCuKsAK5gLiluIAAaGQBCGRkAjLlK+RGgkLCIpCAADACKwS0NABKjAOIAHKMAcgDMowAqy1QATABq6yCLAGLuwYtZAOzBACwAogBslwDSAKyXADJ3VI8X88GPtQDCwQAnDcBvsgRlJlQMvdglMWgAtYIAKQu7xALymKzSACUXsEhi0pvidsF3LVzpRwBAys56ABPDgASW+VCwEAM-DKtH0KBOMxOfzs9hAhFouASCC6IBgEHoOF0IAAVgpaEgqLhGOEFJobLoYGh+KLLEA?clientId=icc';
var CDN_IMG_B = 'https://prs.porsche.com/iod/image/IN/XABAA1/1/N4Igxg9gdgZglgcxALlAQynAtmgLnaAZxQG0BdAGnDSwFMAnNFUOAExRFoA9cBaAC0T9e9Wmnq8ANrRi4QVCAAd8RZiABu4uBjnIQrWoQDWuJSAC+5qrSjq49aHSi6W7PQHVBuBhAhYABAAKEPSEYPy08iBKKlDEqJZUkkL4UEioIGwcACIAggCaUTEEccyJIIoOrACuYC6ZbiAAGrkAQrm5AIxFyiXxoJCwiKQgAAwAilGdrQASUwDiABxTAHIAzFMAKhtUAEwAajsgawBiAKpRa-kA7FEALACiAGz3ANIArPcAMi9U73crKLvJoAYSiAE4nqMThDcnMqLlXlF5p0AFpRABSd1+IC+8022QASl8ouNOvNSYcomcmrdKOAINVnPQAJ4cACSgKoWAgBkk+TE9BQu1Gu3elisIEItFwqQQ-RAMBCOF0IAAVopaEgqLhGHFFOIbLoYGhJNLLEA?clientId=icc';

/* THUMBNAIL URLS (mirror thumbnail imgs) */
var THUMB_URLS = [
    CDN_IMG_A, CDN_IMG_B, CDN_IMG_A, CDN_IMG_B,
    CDN_IMG_A, CDN_IMG_B, CDN_IMG_A, CDN_IMG_B,
    CDN_IMG_A, CDN_IMG_B
];

/* INLINE SVG WHEEL (fallback) */
function svgWheel(spokes, fill) {
    var r = 32, cx = 32, cy = 32, hubR = 6;
    var paths = '';
    for (var i = 0; i < spokes; i++) {
        var angle = (i / spokes) * 2 * Math.PI;
        var x = cx + (r - 4) * Math.sin(angle);
        var y = cy - (r - 4) * Math.cos(angle);
        paths += '<line x1="'+cx+'" y1="'+cy+'" x2="'+x+'" y2="'+y+'" stroke="'+fill+'" stroke-width="3.5" stroke-linecap="round"/>';
    }
    return '<svg viewBox="0 0 64 64" style="width:64px;height:64px;">'
        + '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#ddd" stroke="#bbb" stroke-width="2"/>'
        + paths
        + '<circle cx="'+cx+'" cy="'+cy+'" r="'+hubR+'" fill="'+fill+'"/>'
        + '</svg>';
}

/* FORMAT INR */
function fmtINR(n) {
    return 'INR ' + n.toLocaleString('en-IN');
}

/* UPDATE TOTAL PRICE DISPLAY */
function updatePrice() {
    var total = state.basePrice + state.colorAdd + state.wheelAdd
                + state.interiorAdd + state.packagesAdd;
    document.getElementById('totalPriceDisplay').textContent = fmtINR(total);
}

/* SWITCH MAIN IMAGE (with fade) */
function switchImage(src) {
    if (!src) return;
    var img = document.getElementById('mainCarImg');
    img.classList.add('fading');
    var t = setTimeout(function() {
        img.src = src;
        state.currentImg = src;
        document.getElementById('lightboxImg').src = src;
        img.classList.remove('fading');
    }, 340);
}

/* THUMBNAIL CLICK */
function switchThumb(el, src) {
    document.querySelectorAll('.cfg-thumb').forEach(function(t) { t.classList.remove('active'); });
    el.classList.add('active');
    // Use the actual img src inside the thumbnail (CDN URL) instead of local path
    var thumbImg = el.querySelector('img');
    var realSrc = (thumbImg && thumbImg.src && !thumbImg.src.includes('placehold.co')) ? thumbImg.src : src;
    switchImage(realSrc);
}

/* Scroll thumbnail strip */
function scrollThumbs(dir) {
    var strip = document.getElementById('thumbStrip');
    strip.scrollBy({ left: dir * 180, behavior: 'smooth' });
}

/* SECTION COLLAPSE / EXPAND */
function toggleSection(bodyId, headEl) {
    var body = document.getElementById(bodyId);
    var icon = headEl.querySelector('i');
    var isCollapsed = body.classList.contains('collapsed');
    if (isCollapsed) {
        body.classList.remove('collapsed');
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        body.classList.add('collapsed');
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

/* Collapsed row toggle (Wheel Colours etc.) */
function toggleCollapsed(row) {
    var icon = row.querySelector('i');
    if (icon.classList.contains('fa-chevron-down')) {
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

/* EXTERIOR COLOUR SELECTION */
function selectColor(el, group) {
    // Deactivate all exterior colour swatches
    document.querySelectorAll('#block-exterior .cfg-swatch, #block-exterior .cfg-pts-row').forEach(function(s) {
        s.classList.remove('active');
    });
    el.classList.add('active');

    var price = parseInt(el.dataset && el.dataset.price) || 0;
    var name  = el.dataset && el.dataset.name ? el.dataset.name : 'Paint to Sample';
    var img   = el.dataset && el.dataset.img;

    state.colorAdd  = price;
    state.colorName = name;
    updatePrice();
    if (img) switchImage(img);
}

/* WHEEL SELECTION */
function selectWheel(el) {
    document.querySelectorAll('#block-wheels .cfg-wheel-opt').forEach(function(w) {
        w.classList.remove('active');
    });
    el.classList.add('active');

    var price = parseInt(el.dataset.price) || 0;
    var size  = el.dataset.size || '20';
    var img   = el.dataset.img;
    var name  = el.querySelector('.cfg-wheel-opt-name').textContent;

    state.wheelAdd  = price;
    state.wheelName = name + ' ' + size + '-inch';
    updatePrice();
    if (img) switchImage(img);
}

/* INTERIOR SELECTION */
function selectInterior(el) {
    document.querySelectorAll('#block-interior .cfg-interior-swatch').forEach(function(s) {
        s.classList.remove('active');
    });
    el.classList.add('active');

    var price = parseInt(el.dataset.price) || 0;
    var name  = el.dataset.name;
    var img   = el.dataset.img;

    state.interiorAdd  = price;
    state.interiorName = name;
    updatePrice();
    if (img) switchImage(img);
}

/* PACKAGE TOGGLE */
function togglePackage(el) {
    el.classList.toggle('active');
    var total = 0;
    document.querySelectorAll('.cfg-package.active').forEach(function(p) {
        total += parseInt(p.dataset.price) || 0;
    });
    state.packagesAdd = total;
    updatePrice();
}

/* CAMERA CYCLE */
var viewIdx = 0;
var viewList = [
    CDN_IMG_A, CDN_IMG_B, CDN_IMG_A, CDN_IMG_B
];
function cycleView() {
    viewIdx = (viewIdx + 1) % viewList.length;
    switchImage(viewList[viewIdx]);
}

/* LIGHTBOX */
function openLightbox() {
    document.getElementById('lightboxImg').src = state.currentImg;
    document.getElementById('lightbox').classList.add('show');
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
}

/* SUMMARY DRAWER */
function openSummary() {
    var total = state.basePrice + state.colorAdd + state.wheelAdd
                + state.interiorAdd + state.packagesAdd;

    var pkgLines = '';
    document.querySelectorAll('.cfg-package.active').forEach(function(p) {
        pkgLines += '<div class="cfg-summary-row">'
            + '<span class="cfg-summary-item">' + p.querySelector('.cfg-pkg-name').textContent + '</span>'
            + '<span class="cfg-summary-val">' + fmtINR(parseInt(p.dataset.price)||0) + '</span>'
            + '</div>';
    });
    if (!pkgLines) pkgLines = '<div class="cfg-summary-row"><span class="cfg-summary-item" style="color:#aaa;">No packages selected</span></div>';

    document.getElementById('summaryBody').innerHTML =
        '<div class="cfg-summary-row"><span class="cfg-summary-item">Base vehicle</span><span class="cfg-summary-val">' + fmtINR(state.basePrice) + '</span></div>'
        + '<div class="cfg-summary-row"><span class="cfg-summary-item">Exterior: ' + state.colorName + '</span><span class="cfg-summary-val">' + (state.colorAdd > 0 ? fmtINR(state.colorAdd) : 'Included') + '</span></div>'
        + '<div class="cfg-summary-row"><span class="cfg-summary-item">Wheels: ' + state.wheelName + '</span><span class="cfg-summary-val">' + (state.wheelAdd > 0 ? fmtINR(state.wheelAdd) : 'Standard') + '</span></div>'
        + '<div class="cfg-summary-row"><span class="cfg-summary-item">Interior: ' + state.interiorName + '</span><span class="cfg-summary-val">' + (state.interiorAdd > 0 ? fmtINR(state.interiorAdd) : 'Included') + '</span></div>'
        + pkgLines;

    document.getElementById('summaryTotal').textContent = fmtINR(total);
    document.getElementById('summaryOverlay').classList.add('show');
}
function closeSummary() {
    document.getElementById('summaryOverlay').classList.remove('show');
}

/* SEARCH */
function handleSearch(q) {
    q = q.toLowerCase().trim();
    if (!q) {
        document.querySelectorAll('.cfg-section-block, .cfg-collapsed-row').forEach(function(el) {
            el.style.display = '';
        });
        return;
    }
    // Simple keyword highlight — show sections containing match
    document.querySelectorAll('.cfg-section-block').forEach(function(block) {
        var text = block.textContent.toLowerCase();
        block.style.display = text.includes(q) ? '' : 'none';
    });
}

/* ─KEYBOARD */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
        closeSummary();
    }
});

/* INIT */
updatePrice();
