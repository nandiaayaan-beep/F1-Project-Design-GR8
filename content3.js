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

  const DisplayColours = {
    'driver-display--hamilton': { border: '3px solid rgba(0, 212, 170, 1)', shadow: '0 10px 30px rgba(0, 212, 170, 0.6)' },
    'driver-display--verstappen': { border: '3px solid rgba(255, 0, 0, 1)', shadow: '0 10px 30px rgba(255, 0, 0, 0.6)' },
    'driver-display--senna': { border: '3px solid rgba(255, 130, 0, 1)', shadow: '0 10px 30px rgba(255, 130, 0, 0.6)' },
    'driver-display--schumacher': { border: '3px solid rgba(255, 0, 0, 1)', shadow: '0 10px 30px rgba(255, 0, 0, 0.6)' },
    'driver-display--fangio': { border: '3px solid rgba(192, 192, 192, 1)', shadow: '0 10px 30px rgba(192, 192, 192, 0.6)' }
  };

  const allGridHoverClasses = Object.values(driverHoverClasses);
  const entries = Object.entries(driverHoverClasses);

  for (let [cardClass] of entries) {
    const card = document.querySelector('.' + cardClass);
    if (!card) continue;

    card.addEventListener('mouseenter', function() {
      if (!driverGrid) return;

      const display = card.querySelector('.driver-display');

      for (let gridClass of allGridHoverClasses) {
        driverGrid.classList.remove(gridClass);
      }

      for (let [currentCardClass, gridClass] of entries) {
        if (!card.classList.contains(currentCardClass)) continue;

        driverGrid.classList.add(gridClass);

        const color = teamColors[currentCardClass];
        if (color) {
          const useRightBorder = currentCardClass === 'driver-card--verstappen';
          card.style.borderLeft = useRightBorder ? '' : '3px solid ' + color.border;
          card.style.borderRight = useRightBorder ? '3px solid ' + color.border : '';
          card.style.boxShadow = '0 10px 30px ' + color.shadow;
        }

        const displayKey = currentCardClass.replace('driver-card--', 'driver-display--');
        const displayColor = DisplayColours[displayKey];
        if (display && displayColor) {
          const useRightBorder = displayKey === 'driver-display--verstappen';
          display.style.borderLeft = useRightBorder ? '' : displayColor.border;
          display.style.borderRight = useRightBorder ? displayColor.border : '';
          display.style.boxShadow = displayColor.shadow;
        }

        break;
      }

      if (display) {
        display.classList.add('driver-display--visible');
      }
    });

    card.addEventListener('mouseleave', function() {
      if (!driverGrid) return;

      const display = card.querySelector('.driver-display');

      for (let gridClass of allGridHoverClasses) {
        driverGrid.classList.remove(gridClass);
      }

      card.style.borderLeft = '';
      card.style.borderRight = '';
      card.style.boxShadow = '';

      if (display) {
        display.style.borderLeft = '';
        display.style.borderRight = '';
        display.style.boxShadow = '';
        display.classList.remove('driver-display--visible');
      }
    });
  }
});
