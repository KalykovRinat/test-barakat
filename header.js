let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.top = "-100px";
    } else {
        header.style.top = "0";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const headerButtons = document.querySelector('.header-buttons');

  burger.addEventListener('click', () => {
    menu.classList.toggle('active');
    headerButtons.classList.toggle('active');

    // Меняем aria-expanded для доступности
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !expanded);
  });
