document.addEventListener('DOMContentLoaded'), () => {
    const header = document.querySelector('.header1');
    const navbar = document.querySelector('.navbar');
}

updateNavbar();
window.addEventListener('scroll', updateNavbar);

function updateNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}