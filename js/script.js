const elementIsVisibleInViewport=(e,t=!1)=>{const{top:n,left:r,bottom:s,right:o}=e.getBoundingClientRect(),{innerHeight:d,innerWidth:l}=window;return t?n>0&&n<d||s>0&&s<d:n>=0&&r>=0&&s<=d&&o<=l},closeHeaderBar=()=>{const e={headerBar:document.querySelector(".header-bar"),closeIcon:document.querySelector(".header-bar-close")};e.closeIcon.addEventListener("click",(()=>{e.headerBar.classList.toggle("closed")}))},formatCurrency=e=>new Intl.NumberFormat("en-US",{currency:"USD",maximumFractionDigits:0}).format(e),counterAnimated=({obj:e,start:t,end:n,type:r="number",duration:s=2e3})=>{let o=null;const d=parseFloat(t),l=parseFloat(n),i=t=>{o||(o=t);const n=Math.min((t-o)/s,1),c=Math.floor(n*(l-d)+d);e.innerHTML="currency"===r?formatCurrency(c):c,n<1&&window.requestAnimationFrame(i)};window.requestAnimationFrame(i)},runCounter=()=>{const e=document.querySelector(".row-goals"),t=document.querySelector(".hw-counter"),n=document.querySelectorAll(".hw-counter");if(elementIsVisibleInViewport(e,!0)&&"00"===t.innerHTML){for(const e of n)counterAnimated({obj:e,start:e.getAttribute("data-start"),end:e.getAttribute("data-end"),type:e.getAttribute("data-type")});window.removeEventListener("scroll",runCounter)}},slider={attrs:{slides:0,currentSlideIndex:1,xDown:null,yDown:null},elements:{main:document.querySelector(".slider"),dots:document.querySelector(".slider-dots")},methods:{changeSlide:e=>{const t={currentDot:document.querySelector(".slide-dot.active"),currentSlide:document.querySelector(".slide.current"),nextDot:document.querySelector(`.slide-dot[data-slide="${e}"]`),nextSlide:document.querySelector(`.slide[data-slide="${e}"]`)};t.currentSlide.classList.remove("current"),t.nextSlide.classList.toggle("current"),t.currentDot.classList.remove("active"),t.nextDot.classList.toggle("active")},dotOnClick:()=>{document.body.onclick=function(e){const t=e.target;if("slide-dot"===t.getAttribute("class")){const e=t.getAttribute("data-slide");slider.methods.changeSlide(e),t.className+=" active",slider.attrs.currentSlideIndex=e}}},getTouches:e=>e.touches,handleTouchStart:e=>{const t=slider.methods.getTouches(e)[0];slider.attrs.xDown=t.clientX,slider.attrs.yDown=t.clientY},handleTouchMove:e=>{if(!slider.attrs.xDown||!slider.attrs.yDown)return;const t=e.touches[0].clientX,n=e.touches[0].clientY,r=slider.attrs.xDown-t,s=slider.attrs.yDown-n;Math.abs(r)>Math.abs(s)&&(e.preventDefault(),r>0?slider.attrs.currentSlideIndex<slider.attrs.slides&&(slider.attrs.currentSlideIndex++,slider.methods.changeSlide(slider.attrs.currentSlideIndex)):slider.attrs.currentSlideIndex>1&&(slider.attrs.currentSlideIndex--,slider.methods.changeSlide(slider.attrs.currentSlideIndex))),slider.attrs.xDown=null,slider.attrs.yDown=null},addDots:()=>{for(let e=1;e<=slider.attrs.slides;e++){const t=document.createElement("li");t.classList.add("slide-dot"),t.setAttribute("data-slide",e),1===e&&t.classList.add("active"),slider.elements.dots.append(t)}slider.methods.dotOnClick()}},onInit:({slides:e})=>{slider.attrs.slides=e,slider.elements.main.addEventListener("touchstart",slider.methods.handleTouchStart,!1),slider.elements.main.addEventListener("touchmove",slider.methods.handleTouchMove,!1),slider.methods.addDots()}},fadeInSection=()=>{const e=document.querySelectorAll("section");if(e?.length)for(const t of e){const e=t.children[0];elementIsVisibleInViewport(t,!0)&&!e.classList?.contains("fade-in")&&e.classList.add("fade-in")}},closeOpenMenuMobile=()=>{document.querySelector(".header-nav").classList.toggle("opened")},onLoadWindow=()=>{closeHeaderBar();const e=document.querySelectorAll(".js-menu");for(const t of e)t.addEventListener("click",(()=>{closeOpenMenuMobile()}));const t=document.querySelectorAll(".slide");t?.length&&slider.onInit({slides:t.length});const n=document.querySelectorAll(".hw-counter");n?.length&&(window.addEventListener("scroll",runCounter),runCounter()),window.addEventListener("scroll",fadeInSection),fadeInSection()};window.onload=onLoadWindow;