var tl = gsap.timeline();

barba.init({
  transitions: [
    {
      name: "right-to-left",
      from: {
        namespace: ["home", "page2"],
      },

      to: {
        namespace: ["page3", "home"],
      },

      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          x: "-100vw",
        });
      },
      enter(data) {
        return tl.from(data.next.container, {
          opacity: 0,
          x: "100vw",
        });
      },
    },

    {
      name: "left-to-right",
      from: {
        namespace: ["home", "page3"],
      },

      to: {
        namespace: ["page2", "home"],
      },
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          x: "100vw",
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          x: "-100vw",
        });
      },
    },
  ],
});

// burger
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach((n) => n.addEventListener("click", closeMenu));

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}
