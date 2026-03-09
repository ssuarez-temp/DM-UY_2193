const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const carousel = document.querySelector(".carousel");

let index = 0;
let autoplay;

function getGap() {
    const style = window.getComputedStyle(track);
    return parseFloat(style.gap) || 0;
}

function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;
    const gap = getGap();

    const offset = index * (slideWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
}

function nextSlide() {
    index++;
    if (index >= slides.length) index = 0;
    updateCarousel();
}

function prevSlide() {
    index--;
    if (index < 0) index = slides.length - 1;
    updateCarousel();
}

next.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
});

prev.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
});

function startAutoplay() {
    autoplay = setInterval(nextSlide, 5000);
}

function restartAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
}

carousel.addEventListener("mouseenter", () => {
    clearInterval(autoplay);
});

carousel.addEventListener("mouseleave", () => {
    startAutoplay();
});

window.addEventListener("resize", updateCarousel);

updateCarousel();
startAutoplay();