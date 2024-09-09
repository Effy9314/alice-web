document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-personaggi');
    const items = carousel.querySelectorAll('.carousel-item-personaggi');
    const prevButton = document.querySelector('.carousel-button-personaggi.prev');
    const nextButton = document.querySelector('.carousel-button-personaggi.next');
    let currentIndex = 0;
    let interval;
    let touchStartX = 0;
    let touchEndX = 0;

    function showItem(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    function startAutoPlay() {
        interval = setInterval(nextItem, 5000); // Cambia ogni 5 secondi
    }

    function stopAutoPlay() {
        clearInterval(interval);
    }

    prevButton.addEventListener('click', () => {
        prevItem();
        stopAutoPlay();
        startAutoPlay();
    });

    nextButton.addEventListener('click', () => {
        nextItem();
        stopAutoPlay();
        startAutoPlay();
    });

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Gestione degli eventi touch
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX) {
            nextItem();
        } else if (touchEndX > touchStartX) {
            prevItem();
        }
        stopAutoPlay();
        startAutoPlay();
    }

    showItem(currentIndex);
    startAutoPlay();
});
