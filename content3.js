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

  const cardHoverOnClasses = {
    'driver-card--hamilton': 'driver-card--hoverOnHamilton',
    'driver-card--verstappen': 'driver-card--hoverOnVerstappen',
    'driver-card--senna': 'driver-card--hoverOnSenna',
    'driver-card--schumacher': 'driver-card--hoverOnSchumacher',
    'driver-card--fangio': 'driver-card--hoverOnFangio'
  };

  const allGridHoverClasses = Object.values(driverHoverClasses);
  const allHoverOnClasses = Object.values(cardHoverOnClasses);
  const entries = Object.entries(driverHoverClasses);

  // Driver to team mapping
  const driverTeamMapping = {
    'driver-card--hamilton': 'team-card--ferrari',
    'driver-card--verstappen': 'team-card--ferrari',
    'driver-card--senna': 'team-card--mclaren',
    'driver-card--schumacher': 'team-card--ferrari',
    'driver-card--fangio': 'team-card--ferrari'
  };

  function applyDriverDisplay(card, cardClass) {
    const display = card.querySelector('.driver-display');
    if (!display) return;
    const displayClass = cardClass.replace('driver-card--', 'driver-display--');
    display.classList.add('driver-display--visible', displayClass);
    display.style.top = '100%';
  }

  function resetDriverDisplay(card, cardClass) {
    const display = card.querySelector('.driver-display');
    if (!display) return;
    const displayClass = cardClass.replace('driver-card--', 'driver-display--');
    display.classList.remove('driver-display--visible', displayClass);
  }

  for (let [cardClass, gridClass] of entries) {
    const card = document.querySelector('.' + cardClass);
    if (!card) continue;

    card.addEventListener('mouseenter', function() {
      if (!driverGrid) return;

      // Grid border class
      for (let gridClass of Object.values(driverHoverClasses)) {
        driverGrid.classList.remove(gridClass);
      }

      for (let [otherCardClass, gridClass] of entries) {
        if (card.classList.contains(otherCardClass)) {
          driverGrid.classList.add(gridClass);

          // Remove all hoverOn classes from all cards first
          for (let otherCardClass of Object.keys(cardHoverOnClasses)) {
            const otherCard = document.querySelector('.' + otherCardClass);
            if (otherCard) {
              for (let hoverOnClass of allHoverOnClasses) {
                otherCard.classList.remove(hoverOnClass);
              }
            }
          }

          // Add the hoverOn class of the hovered driver to all cards
          const hoverOnClass = cardHoverOnClasses[cardClass];
          for (let CardClass2 of Object.keys(cardHoverOnClasses)) {
            const otherCard = document.querySelector('.' + CardClass2);
            if (card.classList.contains(CardClass2)) {
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

      // Hide entire teams grid
      if (teamGrid) teamGrid.classList.add('teams-grid--transparent');
    });

    card.addEventListener('mouseleave', function() {
      if (!driverGrid) return;

      // Grid border class cleanup
      for (let gridClass of allGridHoverClasses) {
        driverGrid.classList.remove(gridClass);
      }

      // Remove all hoverOn classes from all cards
      for (let otherCardClass of Object.keys(cardHoverOnClasses)) {
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

      // Restore teams grid
      if (teamGrid) teamGrid.classList.remove('teams-grid--transparent');
    });
  }

  // ===== Team Hover Logic =====
  const teamGrid = document.getElementById('teamGrid');
  const teamHoverClasses = {
    'team-card--ferrari': 'teams-grid--hover-ferrari',
    'team-card--mclaren': 'teams-grid--hover-mclaren'
  };

  const teamHoverOnClasses = {
    'team-card--ferrari': 'team-card--hoverOnFerrari',
    'team-card--mclaren': 'team-card--hoverOnMclaren'
  };

  const allTeamGridHoverClasses = Object.values(teamHoverClasses);
  const allTeamHoverOnClasses = Object.values(teamHoverOnClasses);
  const teamEntries = Object.entries(teamHoverClasses);

  function applyTeamDisplay(card, cardClass) {
    const display = card.querySelector('.team-display');
    if (!display) return;
    const displayClass = cardClass.replace('team-card--', 'team-display--');
    display.classList.add('team-display--visible', displayClass);
  }

  function resetTeamDisplay(card, cardClass) {
    const display = card.querySelector('.team-display');
    if (!display) return;
    const displayClass = cardClass.replace('team-card--', 'team-display--');
    display.classList.remove('team-display--visible', displayClass);
  }

  for (let [cardClass, gridClass] of teamEntries) {
    const card = document.querySelector('.' + cardClass);
    if (!card) continue;

    card.addEventListener('mouseenter', function() {
      if (!teamGrid) return;

      // Grid border class
      for (let gridClass of allTeamGridHoverClasses) {
        teamGrid.classList.remove(gridClass);
      }

      for (let [innerCardClass, gridClass] of teamEntries) {
        if (card.classList.contains(innerCardClass)) {
          teamGrid.classList.add(gridClass);

          // Remove all hoverOn classes from all cards first
          for (let otherCardClass of Object.keys(teamHoverOnClasses)) {
            const otherCard = document.querySelector('.' + otherCardClass);
            if (otherCard) {
              for (let hoverOnClass of allTeamHoverOnClasses) {
                otherCard.classList.remove(hoverOnClass);
              }
            }
          }

          // Add the hoverOn class of the hovered team to all cards
          const hoverOnClass = teamHoverOnClasses[innerCardClass];
          for (let otherCardClass of Object.keys(teamHoverOnClasses)) {
            const otherCard = document.querySelector('.' + otherCardClass);
            if (otherCard) {
              otherCard.classList.add(hoverOnClass);
            }
          }

          break;
        }
      }

      // Team display show
      applyTeamDisplay(card, cardClass);
    });

    card.addEventListener('mouseleave', function() {
      if (!teamGrid) return;

      // Grid border class cleanup
      for (let gridClass of allTeamGridHoverClasses) {
        teamGrid.classList.remove(gridClass);
      }

      // Remove all hoverOn classes from all cards
      for (let otherCardClass of Object.keys(teamHoverOnClasses)) {
        const otherCard = document.querySelector('.' + otherCardClass);
        if (otherCard) {
          for (let hoverOnClass of allTeamHoverOnClasses) {
            otherCard.classList.remove(hoverOnClass);
          }
        }
      }

      // Team display hide
      resetTeamDisplay(card, cardClass);
    });
  }
});