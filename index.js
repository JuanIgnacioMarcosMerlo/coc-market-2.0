import { getProducts } from "./js/getData.js";
import { loadProduct } from "./js/context.js";
import { addCart } from "./js/addCart.js";
import { loadRoute } from "./js/route.js";

function cantCart() {
  loadRoute();
  document.addEventListener("DOMContentLoaded", getProducts);
  loadProduct();
  addCart(updateCartQuantity);
  const cart = document.querySelector(".cart");
  const quanCart = document.querySelector(".quanCart");
  cart.appendChild(quanCart);

  function updateCartQuantity() {
    let dataCart = JSON.parse(localStorage.getItem("dataCart")) || [];
    let quantityInCart = dataCart.length;
    quanCart.textContent = quantityInCart;
  }
  updateCartQuantity();
  document
    .querySelector(".addCartProduct")
    .addEventListener("click", updateCartQuantity);
}

cantCart();
