const closeHeaderBar = () => {
  const elements = {
    headerBar: document.querySelector(".header-bar"),
    closeIcon: document.querySelector(".header-bar-close"),
  };

  elements.closeIcon.addEventListener("click", () => {
    elements.headerBar.classList.toggle("closed");
  });
};

const onInit = () => {
  closeHeaderBar();
};

window.onload = onInit;
