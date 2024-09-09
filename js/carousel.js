document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    const overlay = document.querySelector('.fullscreen-overlay');
    const fullscreenImage = overlay.querySelector('.fullscreen-image');
    const carouselImages = document.querySelectorAll('.carousel-image');

    function showItem(index) {
        items.forEach((item, i) => {
            item.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    function showFullscreen(src, alt) {
        fullscreenImage.src = src;
        fullscreenImage.alt = alt;
        overlay.style.display = 'flex';
    }

    function hideFullscreen() {
        overlay.style.display = 'none';
    }

    nextButton.addEventListener('click', showNext);
    prevButton.addEventListener('click', showPrev);

    carouselImages.forEach(img => {
        img.addEventListener('click', function() {
            showFullscreen(this.src, this.alt);
        });
    });

    overlay.addEventListener('click', hideFullscreen);

    // Gestione del tocco per dispositivi mobili
    let touchStartX = 0;
    let touchEndX = 0;

    overlay.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    overlay.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX) {
            // Swipe verso sinistra, mostra l'immagine successiva
            showNext();
        } else if (touchEndX > touchStartX) {
            // Swipe verso destra, mostra l'immagine precedente
            showPrev();
        } else {
            // Tocco semplice, chiudi l'immagine a schermo intero
            hideFullscreen();
        }
    }, false);
});
