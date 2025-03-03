"use strict";

const cardCta = document.querySelectorAll(".products__product-buy-cta");
const basketBtn = document.querySelector(".basket__btn");
const basketDiv = document.querySelector(".basket");

let basketItems = 0;

cardCta.forEach((btn) =>
  btn.addEventListener("click", () => {
    basketItems++;

    if (basketItems !== 0) {
      basketDiv.style.opacity = "1";
      basketDiv.style.visibility = "visible";
    }

    const item = document.createElement("after");
    item.classList.add("store-item");
    basketBtn.insertAdjacentElement("afterend", item);
    basketBtn.style.animation = "pulse .5s forwards .8s";

    setTimeout(() => {
      item.remove();
      basketBtn.style.animation = "";
    }, 1200);
  })
);
