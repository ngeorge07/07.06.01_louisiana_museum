function addCarousel() {
  // mobile carousel
  // const sliderContainer = document.querySelector(".slider-container");
  // const slides = Array.from(track.children);
  // const nextButton = document.querySelector(".carousel__button--right");
  // const prevButton = document.querySelector(".carousel__button--left");
  // const dots = Array.from(dotsNav.children);
  // const dotsNav = document.querySelector(".carousel__nav");

  const slider = document.querySelector(".slider-container");
  const slides = Array.from(slider.children);

  // nextButton.addEventListener("click", (e) => {
  //   const currentSlide = track.querySelector(".current-slide");
  //   const nextSlide = currentSlide.nextElementSibling;
  //   const currentDot = dotsNav.querySelector(".current-slide");
  //   const nextDot = currentDot.nextElementSibling;
  //   updateDots(currentDot, nextDot);
  //   const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  //   moveToSlide(track, currentSlide, nextSlide);

  //   hideShowArrows(slides, prevButton, nextButton, nextIndex);
  // });
  // window.addEventListener("resize", resize);
  // let slideWidth = slides[0].getBoundingClientRect().width;
  // function resize() {
  //   slideWidth = slides[0].getBoundingClientRect().width;
  //   slides.forEach(setSlidePosition);
  // }
  // // set slides positions
  // function setSlidePosition(slide, index) {
  //   slide.style.left = slideWidth * index + "px";
  //   console.log(slide.style.left);
  // }
  // slides.forEach(setSlidePosition);
  // function moveToSlide(slider, currentSlide, targetSlide) {
  //   track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  //   currentSlide.classList.remove("current-slide");
  //   targetSlide.classList.add("current-slide");
  // }
  // function updateDots(currentDot, targetDot) {
  //   currentDot.classList.remove("current-slide");
  //   targetDot.classList.add("current-slide");
  // }
  // function hideShowArrows(slides, prevButton, nextButton, targetIndex) {
  //   if (targetIndex === 0) {
  //     prevButton.classList.add("is-hidden");
  //     nextButton.classList.remove("is-hidden");
  //   } else if (targetIndex === slides.length - 1) {
  //     prevButton.classList.remove("is-hidden");
  //     nextButton.classList.add("is-hidden");
  //   } else {
  //     prevButton.classList.remove("is-hidden");
  //     nextButton.classList.remove("is-hidden");
  //   }
  // }
  // // when I click left, move slides to the left
  // prevButton.addEventListener("click", (e) => {
  //   const currentSlide = track.querySelector(".current-slide");
  //   const prevSlide = currentSlide.previousElementSibling;
  //   const currentDot = dotsNav.querySelector(".current-slide");
  //   const prevDot = currentDot.previousElementSibling;
  //   const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  //   moveToSlide(track, currentSlide, prevSlide);
  //   updateDots(currentDot, prevDot);
  //   hideShowArrows(slides, prevButton, nextButton, prevIndex);
  // });
  // // when I click right, move slides to the right

  // // when I click nav indicator, move to that slide
  // dotsNav.addEventListener("click", (e) => {
  //   //what dod am I clicking?
  //   const targetDot = e.target.closest("button");
  //   if (!targetDot) return;
  //   const currentSlide = slider.querySelector(".current-slide");
  //   const currentDot = dotsNav.querySelector(".current-slide");
  //   const targetIndex = dots.findIndex((dot) => dot === targetDot);
  //   const targetSlide = slides[targetIndex];
  //   moveToSlide(slider, currentSlide, targetSlide);
  //   updateDots(currentDot, targetDot);
  //   // hideShowArrows(slides, prevButton, nextButton, targetIndex);
  // });

  /*
  This JS is from the following project:
  https://github.com/bushblade/Full-Screen-Touch-Slider
*/

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

      // https://css-tricks.com/using-requestanimationframe/
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

addCarousel();
