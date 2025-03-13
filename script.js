"use strict";

const cardCta = document.querySelectorAll(".products__product-buy-cta");
const basketBtn = document.querySelector(".basket__btn");
const basketIdx = document.querySelector(".basket__btn-idx");
const basketDiv = document.querySelector(".basket");
const storeItem = document.querySelector(".store-item");
const checkout = document.querySelector(".checkout");
const checkoutInv = document.querySelector(".checkout__invoice");
const checkoutBask = document.querySelector(".checkout__basket");
const checkoutBkg = document.querySelector(".checkout__bkg");

const navList = document.querySelector(".navbar__list");

let basketItems = 0;

const itemBackgrounds = {
  item1:
    "linear-gradient(rgba(255, 255, 255, 0.732), rgba(255, 255, 255, 0.549)),url(/img/compressed/beanie-must-small.webp)",
  item2:
    "linear-gradient(rgba(255, 255, 255, 0.732), rgba(255, 255, 255, 0.549)),url(/img/compressed/scarf-white-small.webp)",
  item3:
    "linear-gradient(rgba(255, 255, 255, 0.732), rgba(255, 255, 255, 0.549)),url(/img/compressed/sweater-blue-small.webp)",
};

cardCta.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    basketItems++;
    basketIdx.textContent = `+${basketItems}`;

    if (basketItems !== 0) {
      basketDiv.style.opacity = "1";
      basketDiv.style.visibility = "visible";
    }

    const pdItem = e.target.closest("li");
    const isFirstPd = pdItem.classList.contains("products__product--1");
    const isSecondPd = pdItem.classList.contains("products__product--2");
    const isThirdPd = pdItem.classList.contains("products__product--3");

    if (isFirstPd) storeItem.style.backgroundImage = itemBackgrounds.item1;
    if (isSecondPd) storeItem.style.backgroundImage = itemBackgrounds.item2;
    if (isThirdPd) storeItem.style.backgroundImage = itemBackgrounds.item3;

    storeItem.classList.add("store-item--animation");

    basketBtn.style.animation = "pulse .5s forwards 0.9s";
    setTimeout(() => {
      storeItem.classList.remove("store-item--animation");
    }, 1000);

    setTimeout(() => {
      storeItem.classList.remove("store-item--animation");

      basketBtn.style.animation = "";
    }, 1500);
  })
);

let toggleBasket = false;

basketBtn.addEventListener("click", () => {
  toggleBasket = !toggleBasket;

  if (toggleBasket) {
    checkout.classList.add("checkout-toggle");

    checkoutInv.classList.remove("checkout__inv-out");
    checkoutInv.classList.add("checkout__inv-in");

    checkoutBask.classList.remove("checkout__bask-out");
    checkoutBask.classList.add("checkout__bask-in");

    checkoutBkg.classList.remove("checkout__bkg-out");
    checkoutBkg.classList.add("checkout__bkg-in");
  } else {
    setTimeout(() => checkout.classList.remove("checkout-toggle"), 1000);

    checkoutInv.classList.remove("checkout__inv-in");
    checkoutInv.classList.add("checkout__inv-out");

    checkoutBask.classList.remove("checkout__bask-in");
    checkoutBask.classList.add("checkout__bask-out");

    checkoutBkg.classList.remove("checkout__bkg-in");
    checkoutBkg.classList.add("checkout__bkg-out");
  }
});

function smoothScrollTo(targetPosition, duration = 500) {
  const startPosition = window.scrollY;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeInOutQuad =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(
      0,
      startPosition + (targetPosition - startPosition) * easeInOutQuad
    );

    if (elapsedTime < duration) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

navList.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  const validTarget = target.classList.contains("link");

  if (!validTarget) return;

  const targetSection = document.querySelector(`${target.hash}`);
  const targetHeightOffset = targetSection.offsetTop;

  smoothScrollTo(targetHeightOffset + 600, 1000);
});
