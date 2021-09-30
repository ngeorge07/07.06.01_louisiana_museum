function collection() {
  const urlParams = new URLSearchParams(document.location.search.substring(1));
  const theme = urlParams.get("theme");
  let url;

  // Test what page is the user coming in from and set the ul containing the data required
  if (theme === "all") {
    url = "https://gnmmd2ndsemester-6f2a.restdb.io/rest/louisiana";
  }
  if (theme === "divein") {
    url =
      "https://gnmmd2ndsemester-6f2a.restdb.io/rest/louisiana?q=%7B%22theme%22%3A%20%22Dive%20in%22%7D";
  } else if (theme === "openup") {
    url =
      "https://gnmmd2ndsemester-6f2a.restdb.io/rest/louisiana?q=%7B%22theme%22%3A%20%22Open%20up%22%7D";
  } else if (theme === "relax") {
    url =
      "https://gnmmd2ndsemester-6f2a.restdb.io/rest/louisiana?q=%7B%22theme%22%3A%20%22Relax%22%7D";
  }
  const options = {
    headers: {
      "x-apikey": "6134eac643cedb6d1f97ecdd",
    },
  };

  // fetch the data from the database
  fetch(url, options)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      handleArt(data);
      document.querySelector(".last-slide").style.opacity = 1;
    });
  function handleArt(data) {
    data.forEach((data) => {
      // grab template from DOM
      const template = document.querySelector(".sliderTemplate").content;

      //clone template
      const clone = template.cloneNode(true);

      // change content
      clone.querySelector("img").src = data.image_url;
      clone.querySelector("h3").textContent = data.artist;
      clone.querySelector("i").textContent = data.title;

      if (data.year === 0) {
        clone.querySelector(".year").textContent = "unkown";
        clone.querySelector(
          "img"
        ).alt = `${data.artist}, ${data.title}, year is unknown, ${data.technique}`;
      } else {
        clone.querySelector(
          "img"
        ).alt = `${data.artist}, ${data.title}, ${data.year}, ${data.technique}`;
        clone.querySelector(".year").textContent = data.year;
      }

      clone.querySelector("p:last-of-type").textContent = data.technique;

      //grab parent and the hardcoded last-slide that will the same for all collection pages
      const parent = document.querySelector(".slider-container");
      const last = parent.querySelector(".last-slide");

      //append clones before the last hardcoded slide
      parent.insertBefore(clone, last);
    });

    // run carousel after the data request is done and the clone are appended to the DOM
    addCarousel();
  }
}

// make a carousel slider
function addCarousel() {
  const slider = document.querySelector(".slider-container");
  const slides = Array.from(slider.children);
  let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;
  slides.forEach((slide, index) => {
    const slideImage = slide.querySelector("img");
    slideImage.addEventListener("dragstart", (e) => e.preventDefault());
    // Touch events
    slide.addEventListener("touchstart", touchStart(index));
    slide.addEventListener("touchend", touchEnd);
    slide.addEventListener("touchmove", touchMove);
    // Mouse events
    slide.addEventListener("mousedown", touchStart(index));
    slide.addEventListener("mouseup", touchEnd);
    slide.addEventListener("mouseleave", touchEnd);
    slide.addEventListener("mousemove", touchMove);
  });
  window.addEventListener("resize", setPositionByIndex);
  // Disable context menu
  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
  function touchStart(index) {
    return function (event) {
      currentIndex = index;
      startPos = getPositionX(event);
      isDragging = true;
      animationID = requestAnimationFrame(animation);
      slider.classList.add("grabbing");
    };
  }
  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
    setPositionByIndex();
    slider.classList.remove("grabbing");
  }
  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }
  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }
  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }
  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }
  function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }
}
collection();
