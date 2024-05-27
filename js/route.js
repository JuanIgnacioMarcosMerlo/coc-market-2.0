export function loadRoute() {
  try {
    const CART = document.querySelector(".cart");
    if (CART) {
      CART.addEventListener("click", () => {
        if (!window.location.pathname.includes("pages")) {
          window.location.href = "./pages/cart.html";
        } else {
          window.location.href = "./cart.html";
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
