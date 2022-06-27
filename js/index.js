'use strict';

// Animated counter with duration of war in header

window.addEventListener('load', windowLoad);

function counterInit(defaultCounter) {
  let counter = defaultCounter
    ? defaultCounter
    : document.querySelector('[data-animation-date]');

  if (counter) {
    animatedCounter(counter);
  }
}

async function windowLoad() {
  counterInit();
  // await loadGalleryImages();
}

// Counter for duration of war

function animatedCounter(counter) {
  let startTimestamp = null;
  const duration = 1000;
  const dateInSeconds = new Date() - new Date('2022-02-23');
  const startValue = Math.floor(dateInSeconds / 1000 / 60 / 60 / 24);
  const startPosition = 0;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    counter.innerHTML = Math.floor(progress * (startPosition + startValue));
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

// API for Gallery

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '28297687-8f7efcb9f303a01fdf33b7dd3';
const PER_PAGE = 12;

async function loadGalleryImages() {
  const images = await fetch(
    `${BASE_URL}?q=ukraine&page=1&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  )
    .then((res) => res.json())
    .then((data) => data.hits);
  return images;
}
