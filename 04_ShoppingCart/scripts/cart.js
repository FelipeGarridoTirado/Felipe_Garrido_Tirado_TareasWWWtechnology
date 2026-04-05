let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartTable = document.getElementById("cartTable");

//tabla del carrito
cart.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${product.title}</td>
        <td>$${product.price}</td>
        <td>
            <input type="number" value="${product.qty}" min="1" data-index="${index}">
        </td>
        <td>$${(product.price * product.qty).toFixed(2)}</td>
        <td>
            <button class="remove" data-index="${index}">Remove</button>
        </td>
    `;

    cartTable.appendChild(row);
});

// Eliminar items
document.querySelectorAll("button.remove").forEach(button => {
    button.addEventListener("click", event => {
        const index = event.target.dataset.index;
        
        cart.splice(index, 1);
        
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    });
});

// Actualizar cantidad
document.querySelectorAll("input[type='number']").forEach(input => {
    input.addEventListener("change", event => {
        const index = event.target.dataset.index;
        const newQty = Number(event.target.value);
        
        cart[index].qty = newQty;
        
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    });
});