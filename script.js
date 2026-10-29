
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

// Menú adaptable para móvil
if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Abrir menú" : "Cerrar menú"
    );

    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
      mainNav.classList.remove("is-open");
    });
  });
}

// Año automático en el pie de página
const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Cinemática de entrada
(() => {
  const intro = document.querySelector("#cinematic-intro");
  const skipButton = document.querySelector("#intro-skip");

  if (!intro) {
    document.body.classList.remove("intro-pending");
    return;
  }

  let finished = false;
  let removalTimer;

  function finishIntro() {
    if (finished) return;
    finished = true;

    intro.classList.add("is-leaving");
    document.body.classList.remove("intro-pending");

    removalTimer = window.setTimeout(() => {
      intro.remove();
    }, 950);
  }

  // Respeta la preferencia de reducir animaciones
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    finishIntro();
    return;
  }

  // La entrada se cierra automáticamente
  window.setTimeout(finishIntro, 3500);

  // También puede saltarse manualmente
  if (skipButton) {
    skipButton.addEventListener("click", finishIntro);
  }

  intro.addEventListener("click", (event) => {
    if (event.target === intro) finishIntro();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") finishIntro();
  }, { once: true });
})();
