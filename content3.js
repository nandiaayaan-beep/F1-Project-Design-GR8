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

  const allGridHoverClasses = Object.values(driverHoverClasses);
  const entries = Object.entries(driverHoverClasses);

  const cards = document.querySelectorAll('.driver-card');
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    card.addEventListener('mouseenter', function() {
      if (!driverGrid) return;
      for (let j = 0; j < allGridHoverClasses.length; j++) {
        driverGrid.classList.remove(allGridHoverClasses[j]);
      }
      for (let k = 0; k < entries.length; k++) {
        const cardClass = entries[k][0];
        const gridClass = entries[k][1];
        if (card.classList.contains(cardClass)) {
          driverGrid.classList.add(gridClass);
          break;
        }
      }
    });

    card.addEventListener('mouseleave', function() {
      if (!driverGrid) return;
      for (let j = 0; j < allGridHoverClasses.length; j++) {
        driverGrid.classList.remove(allGridHoverClasses[j]);
      }
    });
  }
});