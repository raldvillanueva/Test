// 🔥 INIT
document.addEventListener("DOMContentLoaded", renderCart);

// 🔥 MAIN RENDER FUNCTION
function renderCart(){
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const container = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const deliveryEl = document.getElementById("delivery");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkoutBtn");

  container.innerHTML = "";

  let subtotal = 0;

  // 🔥 EMPTY CART UI
  if(cart.length === 0){
    container.innerHTML = `
      <p style="opacity:0.6;">Your cart is empty</p>
    `;
  }

  // 🔥 LOOP ITEMS
  cart.forEach((item, index)=>{
    subtotal += item.price * item.qty;

    container.innerHTML += `
      <div class="item">
        <img src="${item.img}">
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>₱${item.price}</p>

          <div class="controls">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>

          <button class="remove-btn" onclick="removeItem(${index})">
            ✕ Remove
          </button>
        </div>
      </div>
    `;
  });

  // 🔥 DELIVERY LOGIC (FIXED)
  const delivery = cart.length === 0 ? 0 : 50;
  const total = subtotal + delivery;

  subtotalEl.innerText = subtotal;
  deliveryEl.innerText = delivery;
  totalEl.innerText = total;

  // 🔥 CHECKOUT CONTROL
  if(cart.length === 0){
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.disabled = false;
  }
}

// 🔥 CHANGE QTY (NEW CLEAN FUNCTION)
function changeQty(index, amount){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 🔥 MIN LIMIT MESSAGE
  if(cart[index].qty === 1 && amount === -1){
    showMsg("Minimum quantity is 1");
    return;
  }

  cart[index].qty += amount;

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

//SHOW MSG 
function showMsg(text){
  const msg = document.getElementById("msg");

  msg.innerText = text;
  msg.classList.add("show");

  setTimeout(()=>{
    msg.classList.remove("show");
  }, 2000);
}

// 🔥 REMOVE ITEM
function removeItem(index){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// 🔥 NAV
function checkout(){

  const loggedIn = localStorage.getItem("loggedIn");

  if(!loggedIn){
    showToast();
    return;
  }

  // ✅ continue normal checkout
  window.location.href = "../pages/checkout.html";
}

// GO BACK 
function goBack(){
  window.location.href = "../pages/homepage.html";
}

// 🔥 DROPDOWN
function toggleProductsMenu(){
  const menu = document.getElementById("productsDropdown");
  menu.style.display =
    menu.style.display === "block" ? "none" : "block";
}

function goToProducts(category){
  localStorage.setItem("selectedCategory", category);
  window.location.href = "products.html";
}

document.addEventListener("click", function(e){
  if(!e.target.closest(".nav-center")){
    document.getElementById("productsDropdown").style.display = "none";
  }
});

// GO TO HOMEPAGE 
function gotoHomePage(){
  window.location.href = "../pages/homepage.html";
}

// SHOW TOAST
function showToast(){
  const toast = document.getElementById("loginToast");
  toast.classList.add("show");

  // auto hide after 3s (optional)
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// GO TO LOGIN
function goToLogin(){
  window.location.href = "../pages/login.html";
}

