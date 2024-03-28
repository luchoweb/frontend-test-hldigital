const closeHeaderBar = () => {
  const elements = {
    headerBar: document.querySelector(".header-bar"),
    closeIcon: document.querySelector(".header-bar-close"),
  };

  elements.closeIcon.addEventListener("click", () => {
    elements.headerBar.classList.toggle("closed");
  });
};

const changeSlide = () => {
  document.body.onclick = function (ev) {
    const $this = ev.target;

    if ($this.getAttribute("class") == "slide-dot") {
      const slideIndex = $this.getAttribute("data-slide");
      const elements = {
        currentSlide: document.querySelector(".slide.current"),
        nextSlide: document.querySelector(`.slide[data-slide="${slideIndex}"]`)
      };

      elements.currentSlide.classList.remove("current");
      elements.nextSlide.classList.add("current");
    }
  };
};

const onInit = () => {
  closeHeaderBar();
  changeSlide();
};

window.onload = onInit;
