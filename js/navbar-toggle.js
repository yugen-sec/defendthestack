const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarLinks = document.getElementById("navbar-links");
const icon = hamburgerBtn.querySelector("i");
const overlay = document.getElementById("menu-overlay"); 

hamburgerBtn.addEventListener("click", () => {
  navbarLinks.classList.toggle("show");
  overlay.classList.toggle("show");
  document.body.classList.toggle("no-scroll");

  if (navbarLinks.classList.contains("show")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

overlay.addEventListener("click", () => {
  navbarLinks.classList.remove("show");
  overlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
  icon.classList.remove("fa-xmark");
  icon.classList.add("fa-bars");
});