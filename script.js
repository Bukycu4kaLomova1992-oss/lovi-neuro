(function () {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  // Active nav link on scroll
  const sections = [...document.querySelectorAll('main section[id], footer[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a')];

  function updateNav() {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach((a) => {
      a.removeAttribute('aria-current');
      if (a.getAttribute('href') === '#' + current) a.setAttribute('aria-current', 'page');
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

// Carousel scroll — moves 3 items at a time
function carouselMove(id, dir) {
  const carousel = document.getElementById(id);
  if (!carousel) return;
  const item = carousel.querySelector('.carousel-item');
  if (!item) return;
  const step = (item.offsetWidth + 16) * 3; // 3 items + gaps
  carousel.scrollBy({ left: dir * step, behavior: 'smooth' });
}
