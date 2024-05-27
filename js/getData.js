let cartCount = 0;
export async function getProducts() {
  try {
    let fetchPromises = [];
    for (let i = 1; i <= 20; i++) {
      const URL = `https://fakestoreapi.com/products/${i}`;
      fetchPromises.push(fetch(URL));
    }
    const responses = await Promise.all(fetchPromises);
    const cards = document.querySelector(".cards");
    for (let response of responses) {
      if (!response.ok) {
        throw new Error("No se pudo realizar la petición");
      } else {
        const data = await response.json();

        const productClone = cards.cloneNode(true);
        const TITLE = productClone.querySelector(".titleProduct");
        const IMAGE = productClone.querySelector(".image");
        const DESCRIPTION = productClone.querySelector(".description");
        const PRICE = productClone.querySelector(".price");

        const { image, title, description, price } = data;

        TITLE.textContent = title;
        IMAGE.src = image;
        IMAGE.alt = title;
        DESCRIPTION.textContent = description;
        PRICE.textContent = "$ " + price;
        const productsContainer = document.querySelector(".productsContainer");
        productsContainer.appendChild(productClone);

        const GO_PRODUCT = productClone.querySelector(".goProduct");
        GO_PRODUCT.addEventListener("click", () => {
          localStorage.setItem("productData", JSON.stringify(data));
          window.location.href = "./pages/productContext.html";
        });
      }
    }
    const productTemplate = document.querySelector(".productTemplate");
    productTemplate.remove();
  } catch (error) {
    console.log("Error: ", error);
  }
}
