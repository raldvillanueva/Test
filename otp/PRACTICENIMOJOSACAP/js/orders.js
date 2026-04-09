function loadOrders(){
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let container = document.getElementById("orders-list");

  if(orders.length === 0){
    container.innerHTML = `
      <div class="summary">
        <h3>No orders yet</h3>
        <p>Go to store to place an order.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  orders.reverse().forEach(order => {
    let itemsHTML = "";

    order.items.forEach(item => {
      itemsHTML += `
        <p>${item.name} x${item.qty || 1} = ₱${item.price}</p>
      `;
    });

    container.innerHTML += `
      <div class="summary">
        <h3>Order (${order.date})</h3>
        ${itemsHTML}
        <h4>Total: ₱${order.total}</h4>
      </div>
    `;
  });
}

//GO BACK 
function goBack(){
  window.location.href = "../pages/homepage.html";
}

// LOGOUT 
function logout(){
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loggedInUser");

  window.location.href = "../pages/homepage.html";
}

//ORDERS SITE FEATURE 
// 🔥 LOAD PROFILE DATA
function loadProfile(){
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if(user){
    document.getElementById("fullName").innerText =
      (user.fname || "") + " " + (user.lname || "");

    document.getElementById("emailText").innerText =
      user.email || "";
  }
}

// 🔥 SAVE PROFILE
function saveProfile(){
  let user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  user.fname = document.getElementById("fnameProfile").value;
  user.lname = document.getElementById("lnameProfile").value;
  user.email = document.getElementById("emailProfile").value;
  user.address = document.getElementById("addressProfile").value;

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  showView("ordersView"); // go back after save
}

// 🔥 LOGOUT (CURRENT DEVICE)
function logout(){
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loggedInUser");

  window.location.href = "../pages/login.html";
}

// 🔥 LOGOUT EVERYWHERE
function logoutAll(){
  localStorage.clear(); // clears all data

  alert("Signed out everywhere 🔒");

  window.location.href = "../pages/login.html";
}

// 🔥 SHOW VIEW FUNCTION
function showView(view){

  document.querySelectorAll(".view").forEach(v => {
    v.classList.remove("active");
  });

  document.getElementById(view).classList.add("active");

  document.getElementById("ordersTab").classList.remove("active");
  document.getElementById("profileTab").classList.remove("active");

  if(view === "ordersView"){
    document.getElementById("ordersTab").classList.add("active");
  } else {
    document.getElementById("profileTab").classList.add("active");
  }
}

// 🔥 RUN ON LOAD
document.addEventListener("DOMContentLoaded", () => {

  const userIcon = document.getElementById("userIcon");
  const dropdown = document.getElementById("dropdown");

  userIcon.onclick = () => {
    dropdown.classList.toggle("show");
  };

  showView("ordersView");
  loadProfile();
  renderOrders();
});

// RENDER ORDERS 
function renderOrders() {
  const container = document.getElementById("orders-list");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-box">
        <h3>No orders yet</h3>
        <p>Go to store to place an order.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {

    const itemsHTML = order.items.map(item => `
      <div class="order-item">
        <img src="${item.img}" class="order-img">

        <div class="order-info">
          <p class="name">${item.name}</p>
          <p class="qty">x${item.qty}</p>
        </div>

        <div class="order-price">₱${item.price * item.qty}</div>
      </div>
    `).join("");

    const total = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return `
      <div class="order-card">

        <div class="order-header">
          Order • ${new Date(order.date).toLocaleString()}
        </div>

        ${itemsHTML}

        <div class="order-divider"></div>

        <div class="order-total">
          <span>Total</span>
          <span>₱${total}</span>
        </div>

      </div>
    `;
  }).join("");
}
