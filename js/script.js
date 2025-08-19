
const hero = document.getElementById('hero');
if(hero){
  // Animation for overflow hero
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * 0.628; // Ύψος του hero

    // Υπολογίζουμε μια τιμή opacity από 1 σε 0 ανάλογα με το scroll
    let opacity = 1 - scrollY / maxScroll;
    if (opacity < 0) opacity = 0;

    hero.style.opacity = opacity;

    // Προαιρετικά κάνουμε scale μικρότερο
    let scale = 1 - scrollY / (maxScroll * 5);
    if (scale < 0.95) scale = 0.95;

    hero.style.transform = `scale(${scale})`;
  }, { passive: true });
}

// Hero link working
const brand = document.querySelector('.brand');
if(brand){
  brand.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
}

// Mobile nav toggle + UX helpers
document.addEventListener('DOMContentLoaded', () => {

  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      document.body.classList.toggle('no-scroll', navLinks.classList.contains('open'));
    });

    // CLOSE when tapping a link
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.classList.remove('no-scroll');
      })
    );
  }

  // Scroll spy for active nav links
  const sections = document.querySelectorAll('section[id]');
  const navA     = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window && sections.length && navA.length) {
    const spy      = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, {threshold: 0.6});
    sections.forEach(sec => spy.observe(sec));
  }

  // Header shadow on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll',
      () => header.classList.toggle('scrolled', window.scrollY > 0), 
      { passive : true }
    );
  }


  //Dynamic year of the footer!
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});


//Gallery
if (window.Swiper && document.querySelector('.swiper')) {
  const swiper = new Swiper('.swiper', {
    loop: true,   //Comment if we dont want loop
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
