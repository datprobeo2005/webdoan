
function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    newQuantity = parseInt(newQuantity);
  
    if (newQuantity <= 0) {
      return alert("Số lượng phải lớn hơn 0!");
    }
  
    cart[index].quantity = newQuantity;  
    localStorage.setItem("cart", JSON.stringify(cart)); 
    renderCart();  // Vẽ lại giỏ hàng
  }
  
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart));  
    renderCart(); 
  }
  
  document.addEventListener("DOMContentLoaded", renderCart);
  

  function addToCart(image, name, price) {
    const quantity = parseInt(document.getElementById("quantity").value);
  
    if (quantity <= 0 || isNaN(quantity)) {
      return alert("Vui lòng nhập số lượng hợp lệ!");
    }
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.name === name);
  

    if (existingProduct) {
      existingProduct.quantity += quantity;  
    } else {
 
      cart.push({ image, name, price, quantity });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart)); 
    alert("Đã thêm sản phẩm vào giỏ hàng!"); 
  }


function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];  
    const cartItems = document.getElementById("cart-items");    
    const cartTotal = document.getElementById("cart-total");      
    cartItems.innerHTML = ""; 
    let total = 0;  
  
    cart.forEach((item, index) => {
        const subTotal = item.price * item.quantity; 
        total += subTotal; 
        cartItems.innerHTML += `
          <tr style="flex-wrap: wrap;">
              <td><img src="${item.image}" alt="${item.name}" style="max-width: 100px;"></td>
              <td>${item.name}</td>
              <td>
                  <input type="number" value="${item.quantity}" min="1" max="10"  class="form-control text-center" onchange="updateQuantity(${index}, this.value)">
              </td>
              <td>${item.price.toLocaleString()}.000 VND</td>
              <td>${subTotal.toLocaleString()}.000 VND</td>
              <td>
                  <button class="btn btn-dark btn-sm" onclick="removeFromCart(${index})">Xóa</button>
              </td>
          </tr>
        `;
      });
      
  
    cartTotal.innerText = `Tổng: ${total.toLocaleString()}.000 VND`;
  }