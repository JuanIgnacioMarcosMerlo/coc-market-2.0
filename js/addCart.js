let dataCart = JSON.parse(localStorage.getItem("dataCart")) || [];
function updateTotal() {
  const TOTAL_ALL_PRODUCTS = document.querySelector(".totalAllProducts");
  const priceTotal =
    TOTAL_ALL_PRODUCTS.querySelector("p") || document.createElement("p");
  if (!TOTAL_ALL_PRODUCTS.contains(priceTotal)) {
    TOTAL_ALL_PRODUCTS.appendChild(priceTotal);
  }
  const totalAllProducts = dataCart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  priceTotal.textContent = "Total: " + totalAllProducts.toFixed(2);
}
function updateCartCount() {
  const totalQuantity = dataCart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  document.querySelector(".quantityCart").textContent = totalQuantity;
}

export function addCart(updateCartQuantity) {
  try {
    const QUANTITY_PRODUCT = document.querySelector(".quantityProduct");
    const ADD_PRODUCT = document.querySelector(".addProduct");
    const DECREASE_PRODUCT = document.querySelector(".decreaseProduct");

    if (ADD_PRODUCT && DECREASE_PRODUCT && QUANTITY_PRODUCT) {
      ADD_PRODUCT.addEventListener("click", (event) => {
        event.preventDefault();
        QUANTITY_PRODUCT.value = parseInt(QUANTITY_PRODUCT.value) + 1;
      });
      DECREASE_PRODUCT.addEventListener("click", (event) => {
        event.preventDefault();
        if (parseInt(QUANTITY_PRODUCT.value) > 1) {
          QUANTITY_PRODUCT.value = parseInt(QUANTITY_PRODUCT.value) - 1;
        }
      });
    }

    const ADD_TO_CART = document.querySelector(".addCartProduct");

    if (ADD_TO_CART) {
      ADD_TO_CART.addEventListener("click", (event) => {
        event.preventDefault();

        const productDataCart = JSON.parse(localStorage.getItem("productData"));
        const quantityProduct = parseInt(QUANTITY_PRODUCT.value);

        const existingProduct = dataCart.find(
          (product) => product.id === productDataCart.id
        );

        if (existingProduct) {
          existingProduct.quantity += quantityProduct;
          existingProduct.total =
            existingProduct.price * existingProduct.quantity;
        } else {
          const product = {
            ...productDataCart,
            quantity: quantityProduct,
            total: productDataCart.price * quantityProduct,
          };

          dataCart.push(product);
        }

        localStorage.setItem("dataCart", JSON.stringify(dataCart));
        updateCartQuantity();

        QUANTITY_PRODUCT.value = "1";
        updateTotal();
        updateCartCount();
      });
    }

    const CART_ITEM = document.querySelector(".cartItem");

    dataCart.map((product) => {
      const { id, image, title, price, quantity, total } = product;
      const PRODUCT_CART = document.createElement("div");
      PRODUCT_CART.classList.add("productCart");
      PRODUCT_CART.id = id;

      const PRODUCT_CART_IMAGE = document.createElement("img");
      PRODUCT_CART_IMAGE.src = image;
      PRODUCT_CART_IMAGE.alt = title;

      const PRODUCT_CART_TITLE = document.createElement("h3");
      PRODUCT_CART_TITLE.textContent = title;

      const PRODUCT_CART_PRICE = document.createElement("p");
      PRODUCT_CART_PRICE.textContent = parseFloat(price).toFixed(2);

      const PRODUCT_CART_QUANTITY = document.createElement("p");
      PRODUCT_CART_QUANTITY.textContent = quantity;

      const PRODUCT_CART_TOTAL = document.createElement("p");
      PRODUCT_CART_TOTAL.textContent = parseFloat(total).toFixed(2);

      const DELETE_PRODUCT = document.createElement("button");
      DELETE_PRODUCT.classList.add("deleteProduct");
      DELETE_PRODUCT.textContent = "Eliminar";
      DELETE_PRODUCT.addEventListener("click", () => {
        const idOfProductToDelete = String(PRODUCT_CART.id);

        const newDataCart = dataCart.filter(
          (product) => String(product.id) !== idOfProductToDelete
        );
        dataCart = newDataCart;
        localStorage.setItem("dataCart", JSON.stringify(newDataCart));
        updateCartQuantity();
        CART_ITEM.removeChild(PRODUCT_CART);

        updateTotal();
        updateCartCount();
      });

      PRODUCT_CART.appendChild(PRODUCT_CART_IMAGE);
      PRODUCT_CART.appendChild(PRODUCT_CART_TITLE);
      PRODUCT_CART.appendChild(PRODUCT_CART_QUANTITY);
      PRODUCT_CART.appendChild(PRODUCT_CART_PRICE);
      PRODUCT_CART.appendChild(PRODUCT_CART_TOTAL);
      PRODUCT_CART.appendChild(DELETE_PRODUCT);

      CART_ITEM.appendChild(PRODUCT_CART);
    });

    updateTotal();
    updateCartCount();
    console.log(updateCartCount());
  } catch (error) {
    console.error("Error: ", error);
  }
}
