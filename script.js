


document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.querySelector('.navbar');
  let scrollTimeout;

  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, 50);
  });

  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const duration = 2000;
    const startTime = performance.now();

    const updateCounters = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        counter.innerText = Math.floor(progress * target).toLocaleString();
      });

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      } else {
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          counter.innerText = target.toLocaleString();
        });
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(updateCounters);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }


  animateCounters();

  const submenuToggles = document.querySelectorAll(".dropdown-submenu > a");

  const closeAllSubmenus = (exceptThis) => {
    document.querySelectorAll(".dropdown-submenu .dropdown-menu.show")
      .forEach(menu => {
        if (!menu.contains(exceptThis)) {
          menu.classList.remove("show");
          const toggle = menu.previousElementSibling;
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      });
  };

  submenuToggles.forEach(toggle => {
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const submenu = this.nextElementSibling;
      const wasOpen = submenu.classList.contains("show");

      closeAllSubmenus(this);

      if (!wasOpen) {
        submenu.classList.add("show");
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close submenus when clicking elsewhere
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown-submenu')) {
      closeAllSubmenus();
    }
  });

});

  // Enable hover for dropdowns
  document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".navbar .dropdown");

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("mouseenter", function () {
        const menu = dropdown.querySelector(".dropdown-menu");
        const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(menu);
        bsDropdown.show();
      });

      dropdown.addEventListener("mouseleave", function () {
        const menu = dropdown.querySelector(".dropdown-menu");
        const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(menu);
        bsDropdown.hide();
      });
    });
  });


  