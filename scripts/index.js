// let tl = gsap.timeline();

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
  ],

  transitions: [
    {
      name: "right-to-right",
      from: {
        namespace: ["home", "page2"],
      },

      to: {
        namespace: ["rooms", "home"],
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
      name: "left-to-left",
      from: {
        namespace: ["home", "rooms"],
      },

      to: {
        namespace: ["page2", "home"],
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
  ],
});

// burger
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
      console.log("ana");
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
