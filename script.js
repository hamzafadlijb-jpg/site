const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const backgroundMedia = document.querySelector(".page-background-media");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

if (backgroundMedia && !reduceMotionQuery.matches) {
  let ticking = false;

  const updateParallax = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const shift = Math.min(scrollTop * 0.06, 48);
    backgroundMedia.style.transform = `translate3d(0, ${-shift}px, 0) scale(1.08)`;
    ticking = false;
  };

  const requestParallaxFrame = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  updateParallax();
  window.addEventListener("scroll", requestParallaxFrame, { passive: true });
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (formStatus && new URLSearchParams(window.location.search).get("envoye") === "1") {
  formStatus.textContent = "Merci — votre demande a bien été envoyée. Nous vous répondrons sous 48 à 72 h ouvrées.";
  formStatus.classList.add("is-visible");
}

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    if (formStatus) {
      formStatus.textContent = "Envoi en cours… Merci de patienter.";
      formStatus.classList.add("is-visible");
    }
  });
}
