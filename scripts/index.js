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
const navToggle = document.querySelector(".nav__toggle");

navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});
