// js/navbar.js

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navbar a");

  const path = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(link => {
    const href = link.getAttribute("href");

    
    if (href === path) {
      link.classList.add("active");
    }
  });
});
