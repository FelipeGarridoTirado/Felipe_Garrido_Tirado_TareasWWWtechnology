// Leer el ID de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const url = `https://fakestoreapi.com/products/${productId}`;

// Variable para guardar el producto
let currentProduct = null;

// Obtener detalles del producto
fetch(url)
  .then(response => response.json())
  .then(product => {
      currentProduct = product; // Guardar referencia
      const detailsDiv = document.getElementById("productDetails");
      
      detailsDiv.innerHTML = `
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <p><strong>$${product.price}</strong></p>
      `;
  });

// Añadir al carrito
document.getElementById("addToCartBtn").addEventListener("click", () => {
    const qty = document.getElementById("quantity").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productToAdd = {
        id: currentProduct.id,
        title: currentProduct.title,
        price: currentProduct.price,
        qty: Number(qty)
    };

    cart.push(productToAdd);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to the cart!");
});