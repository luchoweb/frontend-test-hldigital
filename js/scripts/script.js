const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? (top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

const closeHeaderBar = () => {
  const elements = {
    headerBar: document.querySelector(".header-bar"),
    closeIcon: document.querySelector(".header-bar-close"),
  };

  elements.closeIcon.addEventListener("click", () => {
    elements.headerBar.classList.toggle("closed");
  });
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const counterAnimated = ({
  obj,
  start,
  end,
  type = "number",
  duration = 2000,
}) => {
  let startTimestamp = null;
  const startNum = parseFloat(start);
  const endNum = parseFloat(end);

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;

    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const number = Math.floor(progress * (endNum - startNum) + startNum);

    obj.innerHTML = type === "currency" ? formatCurrency(number) : number;

    if (progress < 1) window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
};

const runCounter = () => {
  const nextCounterSection = document.querySelector(".row-goals");
  const firstCounter = document.querySelector(".hw-counter");
  const counters = document.querySelectorAll(".hw-counter");

  if (
    elementIsVisibleInViewport(nextCounterSection, true) &&
    (firstCounter.innerHTML === "00")
  ) {
    for (const counter of counters) {
      counterAnimated({
        obj: counter,
        start: counter.getAttribute("data-start"),
        end: counter.getAttribute("data-end"),
        type: counter.getAttribute("data-type"),
      });
    }

    window.removeEventListener("scroll", runCounter);
  }
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
    dots: document.querySelector(".slider-dots"),
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
        ev.preventDefault();

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
      for (let i = 1; i <= slider.attrs.slides; i++) {
        const dot = document.createElement("li");
        dot.classList.add("slide-dot");
        dot.setAttribute("data-slide", i);

        if (i === 1) dot.classList.add("active");

        slider.elements.dots.append(dot);
      }

      slider.methods.dotOnClick();
    },
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

const fadeInSection = () => {
  const sections = document.querySelectorAll("section");
  if (sections?.length) {
    for (const section of sections) {
      const element = section.children[0];

      if (
        elementIsVisibleInViewport(section, true) &&
        !element.classList?.contains("fade-in")
      ) {
        element.classList.add("fade-in");
      }
    }
  }
};

const closeOpenMenuMobile = () => {
  const nav = document.querySelector(".header-nav");
  nav.classList.toggle("opened");
}

const onLoadWindow = () => {
  closeHeaderBar();

  const closeOpenMenuEl = document.querySelectorAll(".js-menu");
  for (const element of closeOpenMenuEl) {
    element.addEventListener("click", () => {
      closeOpenMenuMobile();
    });
  }

  // Slider
  const slides = document.querySelectorAll(".slide");
  if (slides?.length) slider.onInit({ slides: slides.length });

  // Counters
  const counters = document.querySelectorAll(".hw-counter");
  if (counters?.length) {
    window.addEventListener("scroll", runCounter);
    runCounter();
  }

  // FadeIn Animation
  window.addEventListener("scroll", fadeInSection);
  fadeInSection();
};

window.onload = onLoadWindow;
