document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');

  updateNavbar();
  window.addEventListener('scroll', updateNavbar);
  
  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  const driverGrid = document.getElementById('driverGrid');
  const driverHoverClasses = {
    'driver-card--hamilton': 'drivers-grid--hover-hamilton',
    'driver-card--verstappen': 'drivers-grid--hover-verstappen',
    'driver-card--senna': 'drivers-grid--hover-senna',
    'driver-card--schumacher': 'drivers-grid--hover-schumacher',
    'driver-card--fangio': 'drivers-grid--hover-fangio'
  };

  const teamColors = {
    'driver-card--hamilton': { border: 'rgba(0, 212, 170, 1)', shadow: 'rgba(0, 212, 170, 0.6)' },
    'driver-card--verstappen': { border: 'rgba(255, 0, 0, 1)', shadow: 'rgba(255, 0, 0, 0.6)' },
    'driver-card--senna': { border: 'rgba(255, 130, 0, 1)', shadow: 'rgba(255, 130, 0, 0.6)' },
    'driver-card--schumacher': { border: 'rgba(255, 0, 0, 1)', shadow: 'rgba(255, 0, 0, 0.6)' },
    'driver-card--fangio': { border: 'rgba(192, 192, 192, 1)', shadow: 'rgba(192, 192, 192, 0.6)' }
  };

  function applyDriverDisplay(card, cardClass) {
    const display = card.querySelector('.driver-display');
    if (!display) return;
    const displayClass = cardClass.replace('driver-card--', 'driver-display--');
    display.classList.add('driver-display--visible', displayClass);
  }

  function resetDriverDisplay(card, cardClass) {
    const display = card.querySelector('.driver-display');
    if (!display) return;
    const displayClass = cardClass.replace('driver-card--', 'driver-display--');
    display.classList.remove('driver-display--visible', displayClass);
  }

  // Maps each card class to its hoverOn class
  const cardHoverOnClasses = {
    'driver-card--hamilton': 'driver-card--hoverOnHamilton',
    'driver-card--verstappen': 'driver-card--hoverOnVerstappen',
    'driver-card--senna': 'driver-card--hoverOnSenna',
    'driver-card--schumacher': 'driver-card--hoverOnSchumacher',
    'driver-card--fangio': 'driver-card--hoverOnFangio'
  };

  const medalHoverClasses = {
    'driver-card--hamilton': {
      medalClass: 'medal--hamilton'
    },
    'driver-card--verstappen': {
      medalClass: 'medal--verstappen'
    },
    'driver-card--senna': {
      medalClass: 'medal--senna'
    },
    'driver-card--schumacher': {
      medalClass: 'medal--schumacher'
    },
    'driver-card--fangio': {
      medalClass: 'medal--fangio'
    }
  };

  const allGridHoverClasses = Object.values(driverHoverClasses);
  const allHoverOnClasses = Object.values(cardHoverOnClasses);
  const entries = Object.entries(driverHoverClasses);
  for (let [cardClass, gridClass] of entries) {
    const card = document.querySelector('.' + cardClass);
    if (!card) continue;

    card.addEventListener('mouseenter', function() {
      if (!driverGrid) return;

      // Grid border class
      for (let [gridClass] of allGridHoverClasses) {
        driverGrid.classList.remove(gridClass);
      }

      for (let [cardClass, gridClass] of entries) {
        if (card.classList.contains(cardClass)) {
          driverGrid.classList.add(gridClass);

          // Remove all hoverOn classes from all cards first
          for (let [otherCardClass] of Object.keys(cardHoverOnClasses)) {
            const otherCard = document.querySelector('.' + otherCardClass);
            if (otherCard) {
              for (let hoverOnClass of allHoverOnClasses) {
                otherCard.classList.remove(hoverOnClass);
              }
            }
          }

          // Add the hoverOn class of the hovered driver to all cards
          const hoverOnClass = cardHoverOnClasses[cardClass];
          for (let [otherCardClass] of Object.keys(cardHoverOnClasses)) {
            const otherCard = document.querySelector('.' + otherCardClass);
            if (otherCard) {
              otherCard.classList.add(hoverOnClass);
            }
          }
        

          break;
        }
      }
      // Add Medal Glow
      const medal = card.querySelector('.medal');
      const medalClass = cardClass.replace('driver-card--', 'medal--');
      if (medal) {
        medal.classList.add(medalClass);
      }

      // Driver display show
      applyDriverDisplay(card, cardClass);
    });

    card.addEventListener('mouseleave', function() {
      if (!driverGrid) return;

      // Grid border class cleanup
      for (let j = 0; j < allGridHoverClasses.length; j++) {
        driverGrid.classList.remove(allGridHoverClasses[j]);
      }

      // Remove all hoverOn classes from all cards
      for (let [otherCardClass] of Object.entries(cardHoverOnClasses)) {
        const otherCard = document.querySelector('.' + otherCardClass);
        if (otherCard) {
          for (let hoverOnClass of allHoverOnClasses) {
            otherCard.classList.remove(hoverOnClass);
          }
        }
      }
    
      // Remove Medal Glow
      const medal = card.querySelector('.medal');
      const medalClass = cardClass.replace('driver-card--', 'medal--');
      if (medal) {
        medal.classList.remove(medalClass);
      }

      // Driver display hide
      resetDriverDisplay(card, cardClass);
    });
  }
});
