"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//selecting elements
const allSections = document.querySelectorAll(".section");
const allbuttons = document.getElementsByTagName("button");
const header = document.querySelector(".header");

//creating elements
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookie for improved functionality <button class="btn btn--close-cookie">Got it! </button>';
header.append(message);

//deleting element
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  message.remove();
});

//scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");

btnScrollTo.addEventListener("click", (e) => {
  section1.scrollIntoView({ behavior: "smooth" });
});

//remove EventListener after 3sec
/*
const h1 = document.querySelector("h1");
const alerth1 = () => {
  alert("Mouse enter event BRUH");
};
h1.addEventListener("mouseenter", alerth1);

setTimeout(() => {
  h1.removeEventListener("mouseenter", alerth1);
}, 4000);

//event propogation
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

//rgb(255,255,255)
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target);
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target);
  // console.log("LINK");
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV", e.target);
  // console.log("LINK");
});


*/

// Page Navigation
// Event delegation in the NAVBARS
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });
// IF there will be 10000 links, it will be laggy
// we will use event delegation

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed COMPONENT
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// Wrong practice
/*
tabs.forEach((el) =>
  el.addEventListener("click", () => {
    console.log("TAB");
  })
);

*/

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Active tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  // Avtive content Ared
  console.log(clicked.dataset.tab);
  tabsContent.forEach((t) => t.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// hovering nav menu fade
const nav = document.querySelector(".nav");

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// adding Argument to handler function
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
// nav.addEventListener("mouseover", function (e) {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     siblings.forEach(function (el) {
//       if (el !== link) {
//         el.style.opacity = 0.5;
//       }
//       logo.style.opacity = 0.5;
//     });
//   }
// });

// nav.addEventListener("mouseout", function (e) {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     siblings.forEach(function (el) {
//       if (el !== link) {
//         el.style.opacity = 1;
//       }
//       logo.style.opacity = 1;
//     });
//   }
// });

// Sticky Navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//   // console.log(this.window.scrollY);
//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// Sticky navigation: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// Sticky navigation: Intersection Observer API

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const sticky = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal Section on scroll

const revealSection = function (entries, observer) {
  const [entry] = entries;

  // guard clause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  // unobserve for better performance
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

// LAZY loading the images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  // wrong way as it will remove the blur withoout full loading
  // entry.target.classList.remove("lazy-img");

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// SLIDER

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const maxSlides = slides.length;

  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let currSlide = 0;

  // const slider = documen = "visible";

  // slides.forEach((s, i) => {
  // s.style.transform = `translateX(${100 * i}%)`;
  // // 0% 100% 200% 300%
  // });
  // create DOTS
  const dotContainer = document.querySelector(".dots");

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const nextSlide = function () {
    if (currSlide === maxSlides - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlides - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  // next slide
  btnRight.addEventListener("click", nextSlide);

  // prev Slide
  btnLeft.addEventListener("click", prevSlide);
  // slides.forEach((s, i) => {
  //   s.style.transform = `translateX(${100 * (i - currSlide)}%)`;
  // });
  // goToSlide(currSlide);
  //currSlide=1: -100% 0% 100% 200%
  // Adding keyboard evens

  // init function
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide(); //Short circuting
  });
  init();
};

slider();
