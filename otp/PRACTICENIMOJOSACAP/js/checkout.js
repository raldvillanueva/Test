function loadCheckout(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("summary-items");

  if(!container) return;

  container.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item=>{
    item.qty = item.qty || 1;

    let itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    container.innerHTML += `
      <div class="order-item">
        <img src="${item.img}" class="order-img">

        <div class="order-info">
          <p class="name">${item.name}</p>
          <p class="qty">x${item.qty}</p>
        </div>

        <div class="order-price">₱${itemTotal}</div>
      </div>
    `;
  });

  let total = subtotal + 50;

  document.getElementById("subtotal").innerText = subtotal;
  document.getElementById("total").innerText = total;
}

function placeOrder(){
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let address = document.getElementById("address").value.trim();
  let city = document.getElementById("city").value.trim();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if(cart.length === 0){
    showMsg("Your cart is empty");
    return;
  }

  if(name.length < 3){
    showMsg("Name must be at least 3 characters");
    return;
  }

    // 🔥 STRICT NUMBER CHECK FIRST
    if(!/^[0-9]+$/.test(phone)){
      showMsg("Phone number must contain numbers only");
      return;
    }

    // 🔥 FORMAT CHECK (PH NUMBER)
    if(!/^09\d{9}$/.test(phone)){
      showMsg("Invalid phone number");
      return;
    }

  if(address.length < 5){
    showMsg("Address is too short");
    return;
  }

  if(city.length < 2){
    showMsg("Enter valid city");
    return;
  }

  // 🔥 CALCULATE TOTAL
  let subtotal = 0;
  cart.forEach(item=>{
    subtotal += item.price * (item.qty || 1);
  });

  let total = subtotal + 50;

  // 🔥 SAVE ORDER (THIS IS THE KEY)
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    items: cart,
    total: total,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  // CLEAR CART
  localStorage.removeItem("cart");

  showMsg("Order placed successfully 🎉", "success");

  setTimeout(()=>{
    window.location.href = "../pages/orders.html";
  }, 1500);
}

// GO BACK 
function goBack(){
  window.location.href = "../pages/cart.html";
}


function showMsg(text, type="error"){
  const msg = document.getElementById("msg");

  msg.innerText = text;
  msg.className = "msg show " + type;

  setTimeout(()=>{
    msg.classList.remove("show");
  }, 2500);
}

document.addEventListener("DOMContentLoaded", () => {
  loadCheckout();

  const phoneInput = document.getElementById("phone");

  if(!phoneInput) return; // safety

  // 🔥 BLOCK NON-NUMBER KEYS + SHOW MESSAGE
  phoneInput.addEventListener("keypress", function(e){
    if(!/[0-9]/.test(e.key)){
      e.preventDefault();
      showMsg("Numbers only ❌");
    }
  });

  // 🔥 CLEAN INPUT (extra safety)
  phoneInput.addEventListener("input", function(){
    const clean = this.value.replace(/[^0-9]/g, "");

    if(this.value !== clean){
      showMsg("Numbers only ❌");
    }

    this.value = clean;
  });

  // 🔥 BLOCK INVALID PASTE
  phoneInput.addEventListener("paste", function(e){
    const paste = (e.clipboardData || window.clipboardData).getData("text");

    if(!/^[0-9]+$/.test(paste)){
      e.preventDefault();
      showMsg("Numbers only ❌");
    }
  });

});

document.addEventListener("DOMContentLoaded", loadCheckout);

