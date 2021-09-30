// slide transitions between pages using barbajs
barba.init({
  views: [
    {
      namespace: "rooms",
      afterEnter({ next }) {
        let script = document.createElement("script");
        script.src = "scripts/rooms.js";
        next.container.appendChild(script);
      },
    },
    {
      namespace: "collection",
      afterEnter({ next }) {
        let script = document.createElement("script");
        script.src = "scripts/collection.js";
        next.container.appendChild(script);
      },
    },
  ],

  transitions: [
    {
      name: "collection-to-rooms",

      from: {
        namespace: ["collection"],
      },

      to: {
        namespace: ["rooms"],
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

    {
      name: "rooms-to-collection",

      to: {
        namespace: ["collection"],
      },

      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          x: "-100vw",
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          x: "100vw",
        });
      },
    },

    {
      name: "left-to-right",

      from: {
        namespace: ["search", "home"],
      },

      to: {
        namespace: ["home", "rooms"],
      },

      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          x: "-100vw",
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          x: "100vw",
        });
      },
    },

    {
      name: "right-to-left",

      to: {
        namespace: ["search", "home"],
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

// animated burger menu
function navSlide() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener(
    "click",
    () => {
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });
      burger.classList.toggle("move");

      if (nav.classList.contains("nav-hidden")) {
        nav.classList.remove("nav-hidden");
        setTimeout(function () {
          nav.classList.remove("nav-hidden-move");
        }, 20);
      } else {
        nav.classList.add("nav-hidden-move");
        nav.addEventListener(
          "transitionend",
          function (e) {
            nav.classList.add("nav-hidden");
          },
          {
            capture: false,
            once: true,
            passive: false,
          }
        );
      }
    },
    false
  );
}

navSlide();
