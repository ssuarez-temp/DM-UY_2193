const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const carousel = document.querySelector(".carousel");

let index = 0;
let autoplay;
let slideWidth = 0;

function getGap() {
    if (!track) return 0;
    const style = window.getComputedStyle(track);
    const gap = style.gap || style.gridGap || '0px';
    return parseFloat(gap) || 0;
}

function updateSlideWidth() {
    if (slides.length > 0) {
        slideWidth = slides[0].offsetWidth;
    }
}

function updateCarousel() {
    if (!track || slides.length === 0) return;
    
    updateSlideWidth();
    const gap = getGap();
    
    index = Math.max(0, Math.min(index, slides.length - 1));
    
    const offset = index * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
}

function nextSlide() {
    if (slides.length === 0) return;
    index = (index + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    if (slides.length === 0) return;
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

if (next) {
    next.addEventListener("click", () => {
        nextSlide();
        restartAutoplay();
    });
}

if (prev) {
    prev.addEventListener("click", () => {
        prevSlide();
        restartAutoplay();
    });
}

function startAutoplay() {
    if (autoplay) {
        clearInterval(autoplay);
    }
    if (slides.length > 0) {
        autoplay = setInterval(nextSlide, 5000);
    }
}

function restartAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
}

if (carousel) {
    carousel.addEventListener("mouseenter", () => {
        clearInterval(autoplay);
    });

    carousel.addEventListener("mouseleave", () => {
        startAutoplay();
    });
}

const debouncedUpdate = debounce(() => {
    updateCarousel();
}, 250);

window.addEventListener("resize", debouncedUpdate);

if (slides.length > 0) {
    updateSlideWidth();
    updateCarousel();
    startAutoplay();
}

window.addEventListener("load", () => {
    updateSlideWidth();
    updateCarousel();
});