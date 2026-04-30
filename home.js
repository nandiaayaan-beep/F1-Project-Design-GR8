document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const button = document.querySelector('.hero-next');
  const dots = document.querySelectorAll('.hero-dot');
  const caption = document.getElementById('hero-caption');
  const currentSlide = document.querySelector('.hero-slide-current');
  const nextSlide = document.querySelector('.hero-slide-next');
  const currentCaption = document.querySelector('.hero-caption-current');
  const nextCaption = document.querySelector('.hero-caption-next');
  const backgrounds = [
    'url("F1imagecycle1.jpg")',
    'url("F1imagecycle2.jpg")',
    'url("F1imagecycle3.jpg")',
    'url("F1imagecycle4.jpg")'
  ];
  

 const altTexts = [
    'A Red Bull car getting tailed by a Haas',
    'A Racing Bull driving in the Abu Dhabi Grand Prix',
    'The first corner of the Azerbaijan Grand Prix led by a Red Bull',
    'A Ferrari taking a fast corner on the track'
  ];

    updateNavbar();
  window.addEventListener('scroll', updateNavbar);
  
  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  let current = 0;
  let isAnimating = false;

  function updateAlts() {
    if (caption) {
      caption.textContent = altTexts[current];
    }
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === current);
    });
  }

  function finishSlideTransition() {
    currentSlide.style.backgroundImage = nextSlide.style.backgroundImage;
    currentSlide.classList.remove('animating-out');
    currentSlide.classList.remove('animating-out-reverse');
    nextSlide.classList.remove('animating-in');
    nextSlide.classList.remove('animating-in-reverse');
    nextSlide.style.transform = 'translateX(100%)';
    currentCaption.textContent = nextCaption.textContent;
    currentCaption.classList.remove('animating-out');
    currentCaption.classList.remove('animating-out-reverse');
    nextCaption.classList.remove('animating-in');
    nextCaption.classList.remove('animating-in-reverse');
    nextCaption.style.transform = 'translateX(100%)';
    isAnimating = false;
  }

  function showBackground(index, animate = true) {
    if (!currentSlide || !nextSlide || !currentCaption || !nextCaption || isAnimating) {
      return;
    }

    if (animate && index === current) {
      return;
    }

    const previousIndex = current;
    current = index;
    if (current === 0) {
      console.log('Current image = 1');
    }
    if (current === 1) {
      console.log('Current image = 2');
    }
    if (current === 2) {
      console.log('Current image = 3');
    }
    if (current === 3) {
      console.log('Current image = 4');
    }
    updateDots();
    updateAlts();

    if (!animate) {
      currentSlide.style.backgroundImage = backgrounds[current];
      nextSlide.style.transform = 'translateX(100%)';
      currentCaption.textContent = altTexts[current];
      nextCaption.style.transform = 'translateX(100%)';
      return;
    }

    isAnimating = true;
    currentSlide.style.backgroundImage = backgrounds[previousIndex];
    nextSlide.style.backgroundImage = backgrounds[current];
    currentCaption.textContent = altTexts[previousIndex];
    nextCaption.textContent = altTexts[current];

    currentSlide.classList.remove('animating-out');
    currentSlide.classList.remove('animating-out-reverse');
    nextSlide.classList.remove('animating-in');
    nextSlide.classList.remove('animating-in-reverse');
    currentCaption.classList.remove('animating-out');
    currentCaption.classList.remove('animating-out-reverse');
    nextCaption.classList.remove('animating-in');
    nextCaption.classList.remove('animating-in-reverse');

    nextSlide.style.transform = 'translateX(100%)';
    nextCaption.style.transform = 'translateX(100%)';

    void currentSlide.offsetWidth;

    currentSlide.classList.add('animating-out');
    nextSlide.classList.add('animating-in');
    currentCaption.classList.add('animating-out');
    nextCaption.classList.add('animating-in');

    nextSlide.addEventListener('animationend', finishSlideTransition, { once: true });
  }

  function showNextBackground() {
    const nextIndex = (current + 1) % backgrounds.length;
    showBackground(nextIndex);
  }

  function showPreviousBackground() {
    if (!currentSlide || !nextSlide || !currentCaption || !nextCaption || isAnimating) {
      return;
    }

    const previousIndex = (current - 1 + backgrounds.length) % backgrounds.length;
    const previousCurrent = current;

    current = previousIndex;
    updateDots();
    updateAlts();

    isAnimating = true;
    currentSlide.style.backgroundImage = backgrounds[previousCurrent];
    nextSlide.style.backgroundImage = backgrounds[current];
    currentCaption.textContent = altTexts[previousCurrent];
    nextCaption.textContent = altTexts[current];

    currentSlide.classList.remove('animating-out');
    currentSlide.classList.remove('animating-out-reverse');
    nextSlide.classList.remove('animating-in');
    nextSlide.classList.remove('animating-in-reverse');
    currentCaption.classList.remove('animating-out');
    currentCaption.classList.remove('animating-out-reverse');
    nextCaption.classList.remove('animating-in');
    nextCaption.classList.remove('animating-in-reverse');

    nextSlide.style.transform = 'translateX(-100%)';
    nextCaption.style.transform = 'translateX(-100%)';

    void currentSlide.offsetWidth;

    currentSlide.classList.add('animating-out-reverse');
    nextSlide.classList.add('animating-in-reverse');
    currentCaption.classList.add('animating-out-reverse');
    nextCaption.classList.add('animating-in-reverse');

    nextSlide.addEventListener('animationend', finishSlideTransition, { once: true });
  }

  function cycleBackground() {
    showNextBackground();
  }

  showBackground(current, false);
  let backgroundInterval = setInterval(cycleBackground, 4000);

  function resetBackgroundInterval() {
    clearInterval(backgroundInterval);
    backgroundInterval = setInterval(cycleBackground, 4000);
  }

  if (button) {
    button.addEventListener('click', () => {
      if (isAnimating === false) {
        showNextBackground();
        resetBackgroundInterval();
      }
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showBackground(index);
      resetBackgroundInterval();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      if (isAnimating === false) {
        showNextBackground();
        resetBackgroundInterval();
      }
    }

    if (event.key === 'ArrowLeft') {
      if (isAnimating === false) {
        showPreviousBackground();
        resetBackgroundInterval();
      }
    }
  });
});
