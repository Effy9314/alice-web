document.addEventListener('DOMContentLoaded', function() {
    const galleria = document.querySelector('.galleria');
    const items = galleria.querySelectorAll('.immagine-container');
    const prevButton = document.querySelector('.galleria-button.prev');
    const nextButton = document.querySelector('.galleria-button.next');
    let currentIndex = 0;
    let interval;

    function showItem(index) {
        items.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
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

    galleria.addEventListener('mouseenter', stopAutoPlay);
    galleria.addEventListener('mouseleave', startAutoPlay);

    showItem(currentIndex);
    startAutoPlay();
});
