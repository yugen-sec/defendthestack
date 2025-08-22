document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.getElementById("search-toggle");
  const searchInput = document.getElementById("search-input");
  const menuOverlay = document.getElementById("menu-overlay");
  const navbarLinks = document.getElementById("navbar-links");

  searchToggle.addEventListener("click", () => {
    const isActive = searchInput.classList.toggle("active");

    if (isActive) {
      menuOverlay.classList.add("show");
      searchInput.focus();
    } else {
      if (!navbarLinks.classList.contains("show")) {
        menuOverlay.classList.remove("show");
        document.querySelector(".search-suggestions").style.display = "none";
      }
    }
  });

  menuOverlay.addEventListener("click", () => {
    searchInput.classList.remove("active");
    menuOverlay.classList.remove("show");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.classList.remove("active");
      document.querySelector(".search-suggestions").style.display = "none";
      if (!navbarLinks.classList.contains("show")) {
        menuOverlay.classList.remove("show");
      }
    }
  });
});
