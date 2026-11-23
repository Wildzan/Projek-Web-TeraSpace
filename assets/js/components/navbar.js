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

  // 4. Scroll spy: ubah menu aktif di navbar publik sesuai posisi scroll
  const spyItems = [
    ...document.querySelectorAll('#navPublicMenu .nav-link[href^="#"]'),
  ]
    .map((link) => ({
      link,
      section: document.querySelector(link.getAttribute("href")),
    }))
    .filter((item) => item.section);

  if (spyItems.length) {
    const updateActiveNav = () => {
      const offset = 120; // sedikit di bawah tinggi navbar sticky
      let current = spyItems[0];

      spyItems.forEach((item) => {
        if (item.section.getBoundingClientRect().top <= offset) {
          current = item;
        }
      });

      // Mentok di bawah halaman -> aktifkan menu terakhir (Kontak)
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) current = spyItems[spyItems.length - 1];

      spyItems.forEach(({ link }) => {
        const isActive = link === current.link;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    };

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);
    updateActiveNav();
  }
});
