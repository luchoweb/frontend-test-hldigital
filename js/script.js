const closeHeaderBar = () => {
  const elements = {
    headerBar: document.querySelector(".header-bar"),
    closeIcon: document.querySelector(".header-bar-close"),
  };

  elements.closeIcon.addEventListener("click", () => {
    elements.headerBar.classList.toggle("closed");
  });
};

const slider = {
  attrs: {
    slides: 0,
    currentSlideIndex: 1,
    xDown: null,
    yDown: null,
  },
  elements: {
    main: document.querySelector(".slider"),
    dots: document.querySelector(".slider-dots")
  },
  methods: {
    changeSlide: (slideIndex) => {
      const elements = {
        currentDot: document.querySelector(".slide-dot.active"),
        currentSlide: document.querySelector(".slide.current"),
        nextDot: document.querySelector(
          `.slide-dot[data-slide="${slideIndex}"]`
        ),
        nextSlide: document.querySelector(`.slide[data-slide="${slideIndex}"]`),
      };

      elements.currentSlide.classList.remove("current");
      elements.nextSlide.classList.toggle("current");

      elements.currentDot.classList.remove("active");
      elements.nextDot.classList.toggle("active");
    },
    dotOnClick: () => {
      document.body.onclick = function (ev) {
        const $this = ev.target;

        if ($this.getAttribute("class") === "slide-dot") {
          const slideIndex = $this.getAttribute("data-slide");
          slider.methods.changeSlide(slideIndex);
          $this.className += " active";
          slider.attrs.currentSlideIndex = slideIndex;
        }
      };
    },
    getTouches: (ev) => {
      return ev.touches;
    },
    handleTouchStart: (ev) => {
      const firstTouch = slider.methods.getTouches(ev)[0];
      slider.attrs.xDown = firstTouch.clientX;
      slider.attrs.yDown = firstTouch.clientY;
    },
    handleTouchMove: (ev) => {
      if (!slider.attrs.xDown || !slider.attrs.yDown) {
        return;
      }

      const xUp = ev.touches[0].clientX;
      const yUp = ev.touches[0].clientY;

      const xDiff = slider.attrs.xDown - xUp;
      const yDiff = slider.attrs.yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          /* right swipe */
          if (slider.attrs.currentSlideIndex < slider.attrs.slides) {
            slider.attrs.currentSlideIndex++;
            slider.methods.changeSlide(slider.attrs.currentSlideIndex);
          }
        } else {
          /* left swipe */
          if (slider.attrs.currentSlideIndex > 1) {
            slider.attrs.currentSlideIndex--;
            slider.methods.changeSlide(slider.attrs.currentSlideIndex);
          }
        }
      }

      slider.attrs.xDown = null;
      slider.attrs.yDown = null;
    },
    addDots: () => {
      for(let i = 1; i <= slider.attrs.slides; i++) {
        const dot = document.createElement('li');
        dot.classList.add('slide-dot');
        dot.setAttribute('data-slide', i);

        if(i === 1) dot.classList.add('active');

        slider.elements.dots.append(dot);
      }

      slider.methods.dotOnClick();
    }
  },
  onInit: ({ slides }) => {
    slider.attrs.slides = slides;

    slider.elements.main.addEventListener(
      "touchstart",
      slider.methods.handleTouchStart,
      false
    );

    slider.elements.main.addEventListener(
      "touchmove",
      slider.methods.handleTouchMove,
      false
    );

    slider.methods.addDots();
  },
};

const onInit = () => {
  const slides = document.querySelectorAll(".slide");
  if (slides?.length) slider.onInit({ slides: slides.length });

  closeHeaderBar();
};

window.onload = onInit;
