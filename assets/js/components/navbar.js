/**
 * Navigasi & Mobile Collapse Handler
 * Teras JTI - Kelompok 4 (NoBugNoCry)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Auto-close navbar collapse on mobile when link is clicked
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navCollapse = document.getElementById("navPublicMenu");

  if (navCollapse && window.bootstrap) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navCollapse.classList.contains("show")) {
          const bsCollapse = window.bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  // 2. Smooth scrolling for internal anchor links (#)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#" && !targetId.startsWith("#modal")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // 3. Highlight active link in internal topbar based on URL
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const internalNavLinks = document.querySelectorAll(".nav-utama .nav-link");
  internalNavLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPath) {
      internalNavLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});
