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

const driverFlags = {
    "Kimi Antonelli"    : "it",
    "George Russell"    : "gb",
    "Charles Leclerc"   : "mc",
    "Lewis Hamilton"    : "gb",
    "Lando Norris"      : "gb",
    "Oscar Piastri"     : "au",
    "Esteban Ocon"      : "fr",
    "Oliver Bearman"    : "gb",
    "Pierre Gasly"      : "fr",
    "Franco Collapinto" : "ar",
    "Max Verstappen"    : "nl",
    "Isack Hadjar"      : "fr",
    "Liam Lawson"       : "nz",
    "Arvid Lindblad"    : "gb",
    "Nico Hulkenberg"   : "de",
    "Gabriel Bortoleto" : "br",
    "Alex Albon"        : "th",
    "Carlos Sainz"      : "es",
    "Sergio Perez"      : "mx",
    "Valtteri Bottas"   : "fi",
    "Fernando Alonso"   : "es",
    "Lance Stroll"      : "ca",
};

// Maps each driver card class to the border colour and box-shadow colour
// that the driver-flag should glow with when that card is hovered.
// Colours are pulled directly from the team palette used throughout the CSS.
const driverFlagHoverStyles = {
    "timelinepair1"  : { border: "2px solid rgba(192, 192, 192, 0.95)", boxShadow: "0 0 8px rgba(192, 192, 192, 1.0), 0 0 18px rgba(192, 192, 192, 0.85), 0 0 30px rgba(192, 192, 192, 0.5)" },  // Mercedes – silver
    "timelinepair2"  : { border: "2px solid rgba(192, 192, 192, 0.95)", boxShadow: "0 0 8px rgba(192, 192, 192, 1.0), 0 0 18px rgba(192, 192, 192, 0.85), 0 0 30px rgba(192, 192, 192, 0.5)" },  // Mercedes – silver
    "timelinepair3"  : { border: "2px solid rgba(220, 0, 0, 0.95)",     boxShadow: "0 0 8px rgba(220, 0, 0, 1.0),     0 0 18px rgba(220, 0, 0, 0.85),     0 0 30px rgba(220, 0, 0, 0.5)"     },  // Ferrari – red
    "timelinepair4"  : { border: "2px solid rgba(220, 0, 0, 0.95)",     boxShadow: "0 0 8px rgba(220, 0, 0, 1.0),     0 0 18px rgba(220, 0, 0, 0.85),     0 0 30px rgba(220, 0, 0, 0.5)"     },  // Ferrari – red
    "timelinepair5"  : { border: "2px solid rgba(255, 135, 0, 0.95)",   boxShadow: "0 0 8px rgba(255, 135, 0, 1.0),   0 0 18px rgba(255, 135, 0, 0.85),   0 0 30px rgba(255, 135, 0, 0.5)"   },  // McLaren – orange
    "timelinepair6"  : { border: "2px solid rgba(255, 135, 0, 0.95)",   boxShadow: "0 0 8px rgba(255, 135, 0, 1.0),   0 0 18px rgba(255, 135, 0, 0.85),   0 0 30px rgba(255, 135, 0, 0.5)"   },  // McLaren – orange
    "timelinepair7"  : { border: "2px solid rgba(255, 255, 255, 0.95)", boxShadow: "0 0 8px rgba(255, 255, 255, 1.0), 0 0 18px rgba(255, 255, 255, 0.85), 0 0 30px rgba(255, 255, 255, 0.5)" },  // Haas – white
    "timelinepair8"  : { border: "2px solid rgba(255, 255, 255, 0.95)", boxShadow: "0 0 8px rgba(255, 255, 255, 1.0), 0 0 18px rgba(255, 255, 255, 0.85), 0 0 30px rgba(255, 255, 255, 0.5)" },  // Haas – white
    "timelinepair9"  : { border: "2px solid rgba(0, 100, 150, 0.95)",   boxShadow: "0 0 8px rgba(0, 100, 150, 1.0),   0 0 18px rgba(0, 100, 150, 0.85),   0 0 30px rgba(0, 100, 150, 0.5)"   },  // Alpine – blue
    "timelinepair10" : { border: "2px solid rgba(0, 100, 150, 0.95)",   boxShadow: "0 0 8px rgba(0, 100, 150, 1.0),   0 0 18px rgba(0, 100, 150, 0.85),   0 0 30px rgba(0, 100, 150, 0.5)"   },  // Alpine – blue
    "timelinepair11" : { border: "2px solid rgba(1, 33, 124, 0.95)",    boxShadow: "0 0 8px rgba(1, 33, 124, 1.0),    0 0 18px rgba(1, 33, 124, 0.85),    0 0 30px rgba(1, 33, 124, 0.5)"    },  // Red Bull – dark blue
    "timelinepair12" : { border: "2px solid rgba(1, 33, 124, 0.95)",    boxShadow: "0 0 8px rgba(1, 33, 124, 1.0),    0 0 18px rgba(1, 33, 124, 0.85),    0 0 30px rgba(1, 33, 124, 0.5)"    },  // Red Bull – dark blue
    "timelinepair13" : { border: "2px solid rgba(255, 255, 255, 0.95)", boxShadow: "0 0 8px rgba(255, 255, 255, 1.0), 0 0 18px rgba(255, 255, 255, 0.85), 0 0 30px rgba(51, 51, 51, 0.5)"    },  // Racing Bulls – white/grey
    "timelinepair14" : { border: "2px solid rgba(255, 255, 255, 0.95)", boxShadow: "0 0 8px rgba(255, 255, 255, 1.0), 0 0 18px rgba(255, 255, 255, 0.85), 0 0 30px rgba(51, 51, 51, 0.5)"    },  // Racing Bulls – white/grey
    "timelinepair15" : { border: "2px solid rgba(206, 18, 18, 0.95)",   boxShadow: "0 0 8px rgba(206, 18, 18, 1.0),   0 0 18px rgba(206, 18, 18, 0.85),   0 0 30px rgba(206, 18, 18, 0.5)"   },  // Audi – red
    "timelinepair16" : { border: "2px solid rgba(206, 18, 18, 0.95)",   boxShadow: "0 0 8px rgba(206, 18, 18, 1.0),   0 0 18px rgba(206, 18, 18, 0.85),   0 0 30px rgba(206, 18, 18, 0.5)"   },  // Audi – red
    "timelinepair17" : { border: "2px solid rgba(0, 120, 191, 0.95)",   boxShadow: "0 0 8px rgba(0, 120, 191, 1.0),   0 0 18px rgba(0, 120, 191, 0.85),   0 0 30px rgba(0, 120, 191, 0.5)"   },  // Williams – blue
    "timelinepair18" : { border: "2px solid rgba(0, 120, 191, 0.95)",   boxShadow: "0 0 8px rgba(0, 120, 191, 1.0),   0 0 18px rgba(0, 120, 191, 0.85),   0 0 30px rgba(0, 120, 191, 0.5)"   },  // Williams – blue
    "timelinepair19" : { border: "2px solid rgba(192, 192, 192, 0.95)", boxShadow: "0 0 8px rgba(192, 192, 192, 1.0), 0 0 18px rgba(192, 192, 192, 0.85), 0 0 30px rgba(192, 192, 192, 0.5)" },  // Cadillac – silver
    "timelinepair20" : { border: "2px solid rgba(192, 192, 192, 0.95)", boxShadow: "0 0 8px rgba(192, 192, 192, 1.0), 0 0 18px rgba(192, 192, 192, 0.85), 0 0 30px rgba(192, 192, 192, 0.5)" },  // Cadillac – silver
    "timelinepair21" : { border: "2px solid rgba(0, 150, 0, 0.95)",     boxShadow: "0 0 8px rgba(0, 150, 0, 1.0),     0 0 18px rgba(0, 150, 0, 0.85),     0 0 30px rgba(0, 150, 0, 0.5)"     },  // Aston Martin – green
    "timelinepair22" : { border: "2px solid rgba(0, 150, 0, 0.95)",     boxShadow: "0 0 8px rgba(0, 150, 0, 1.0),     0 0 18px rgba(0, 150, 0, 0.85),     0 0 30px rgba(0, 150, 0, 0.5)"     },  // Aston Martin – green
};

entries = Object.entries(driverFlagHoverStyles)


function assignDriverFlags() {
    const driverCards = document.querySelectorAll(
        ".timelinepair1, .timelinepair2, .timelinepair3, .timelinepair4," +
        ".timelinepair5, .timelinepair6, .timelinepair7, .timelinepair8," +
        ".timelinepair9, .timelinepair10, .timelinepair11, .timelinepair12," +
        ".timelinepair13, .timelinepair14, .timelinepair15, .timelinepair16," +
        ".timelinepair17, .timelinepair18, .timelinepair19, .timelinepair20," +
        ".timelinepair21, .timelinepair22"
    );

    driverCards.forEach(card => {
        const nameEl  = card.querySelector(".timelinepdate");
        let flagImg = card.querySelector(".driver-flag");

        if (!nameEl || !flagImg) return;

        const driverName = nameEl.textContent.trim();
        const isoCode  = driverFlags[driverName];

        if (isoCode) {
            flagImg.src = `https://flagcdn.com/w80/${isoCode}.png`;
        }

        // Find which timelinepair class this card has and look up its hover style
for (const [key, value] of entries) {
    const cards = document.querySelectorAll('.' + key);
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            let flagImg = card.querySelector('.driver-flag');
            flagImg.style.border = value.border;
            flagImg.style.boxShadow = value.boxShadow;
        });
    });
}
for (const [otherKey, otherValue] of entries) {
    const cards = document.querySelectorAll('.' + otherKey);
    cards.forEach(otherCard => {
        otherCard.addEventListener('mouseleave', () => {
            let flagImg = otherCard.querySelector('.driver-flag');
            flagImg.style.border = '1px solid rgba(0,0,0,0.35)';
            flagImg.style.boxShadow = '0 2px 6px rgba(0,0,0,0.4)';
        });
    });
}})}
document.addEventListener("DOMContentLoaded", assignDriverFlags);