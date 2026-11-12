(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const backToTop = document.querySelector(".back-to-top");

  const closeMenu = () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    nav.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.addEventListener("click", event => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener("click", event => {
    if (!header.contains(event.target)) closeMenu();
  });
  const updateScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
    backToTop.classList.toggle("is-visible", window.scrollY > 450);
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  });

  // Relative PDF links work in VS Code, a local server, and file:// previews.
  // On the published site, open the very same files directly from GitHub.
  if (window.location.hostname === "hnu-ov.github.io") {
    document.querySelectorAll("a[data-repository-url]").forEach(link => {
      link.href = link.dataset.repositoryUrl;
    });
  }
})();
