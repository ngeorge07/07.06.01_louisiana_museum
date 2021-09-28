function addCarousel() {
  const slider = document.querySelector(".slider-container"),
    slides = Array.from(document.querySelectorAll(".slide"));

  // This JS is from the following project:

  /*
  This JS is from the following project:
  https://github.com/bushblade/Full-Screen-Touch-Slider
*/

  let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;

  slides.forEach((slide, index) => {
    const slideImage = slide.querySelector("img");
    console.log(slideImage);
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

  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  function touchStart(index) {
    return function (event) {
      currentIndex = index;
      startPos = getPositionX(event);
      isDragging = true;

      // https://css-tricks.com/using-requestanimationframe/
      animationID = requestAnimationFrame(animation);
      slider.classList.add("grabbing");
    };
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();

    slider.classList.remove("grabbing");
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }
}

addCarousel();
