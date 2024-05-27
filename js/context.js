export function loadProduct() {
  try {
    const productData = JSON.parse(localStorage.getItem("productData"));
    if (productData) {
      const { image, description, title, price } = productData;

      const PRODUCT_IMAGE = document.querySelector(".context_image");
      const PRODUCT_TITLE = document.querySelector(".context_title");
      const PRODUCT_DESCRIPTION = document.querySelector(
        ".context_description"
      );
      const PRODUCT_PRICE = document.querySelector(".context_price");

      PRODUCT_IMAGE.src = image;
      PRODUCT_IMAGE.alt = title;
      PRODUCT_TITLE.textContent = title;
      PRODUCT_DESCRIPTION.textContent = description;
      PRODUCT_PRICE.textContent = "$ "+price;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
