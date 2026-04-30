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
        const flagImg = card.querySelector(".driver-flag");

        if (!nameEl || !flagImg) return;

        const driverName = nameEl.textContent.trim();
        const isoCode    = driverFlags[driverName];

        if (isoCode) {
            flagImg.src = `https://flagcdn.com/w40/${isoCode}.png`;
        }
    });
}

document.addEventListener("DOMContentLoaded", assignDriverFlags);