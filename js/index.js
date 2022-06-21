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

function windowLoad() {
  counterInit();
}
