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
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    console.log("ana");
    nav.classList.toggle("nav-active");
    burger.classList.toggle("move");
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
  });
};
navSlide();
