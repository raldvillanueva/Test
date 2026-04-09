let cart = 0;

const products = [
  {
    name:"Chocolate Chip Cookies Box",
    price:120,
    img:"https://www.thesevenpantry.com/cdn/shop/files/TSP-50-Shades-FOOD-Cookies-in-a-Box.jpg?v=1700633437&width=800"
  },
  {
    name:"Fudge Brownies Box",
    price:150,
    img:"https://cravingskitchenph.com/cdn/shop/files/DSCF6636.jpg?v=1721989391"
  },
  {
    name:"Red Velvet Brownies Box",
    price:180,
    img:"https://freshaprilflours.com/wp-content/uploads/2020/02/red-velvet-brownies-9.jpg"
  },
  {
    name:"Fudge Brownies",
    price:180,
    img:"https://cafedelites.com/wp-content/uploads/2016/08/Fudgy-Cocoa-Brownies-44-1.jpg"
  },
  {
    name:"Chocolate Chip Cookies",
    price:180,
    img:"https://www.meatloafandmelodrama.com/wp-content/uploads/2024/10/best-chocolate-chip-cookies-recipe.jpg"
  }
];

//RENDERING THE PRODUCTS 
function render(){
  const container = document.getElementById("list");

  container.innerHTML = ""; // 🔥 prevent duplicates

  products.forEach((p)=>{
    container.innerHTML += `
      <div class="product-item"
        onclick="viewProduct('${p.name}', '${p.price}', '${p.img}')">
        
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p class="desc">Freshly baked premium treat</p>
      </div>
    `;
  });
}

//VIEW PRODUCT 
function viewProduct(name, price, img){
  const product = { name, price, img };

  localStorage.setItem("selectedProduct", JSON.stringify(product));

  window.location.href = "../pages/product-view.html";
}

function addProduct(name, price, img){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ name, price, img });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

function updateCartCount(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart").innerText = cart.length;
}

updateCartCount();

function goToShop(){
  window.location.href = "../pages/products.html";
}

function goToCart(){
  window.location.href = "../pages/cart.html";
}

function goToLogin(){
  window.location.href = "../pages/login.html";
}


//LOGGED ON
function updateNavUser(){
  const nav = document.getElementById("nav-actions");
  let loggedIn = localStorage.getItem("loggedIn");

  if(loggedIn === "true"){
    nav.innerHTML = `
    <div class="user-icon" id="userIcon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>
    `;

    document.getElementById("userIcon").onclick = goToOrders;
  }
}

function goToOrders(){
  window.location.href = "../pages/orders.html";
}

function logout(){
  localStorage.removeItem("loggedIn");
  location.reload();
}

// OPEN CHAT
document.getElementById("chat-toggle").onclick = () => {
  document.getElementById("chatbox").classList.toggle("hidden");
};

// CLOSE CHAT
document.getElementById("close-chat").onclick = () => {
  document.getElementById("chatbox").classList.add("hidden");
};

// QUICK REPLIES
function quickReply(type){
  let reply = "";

  if(type === "availability"){
    reply = "All our baked products are available daily! 🍪";
  }
  else if(type === "price"){
    reply = "Prices range from ₱90 to ₱180 depending on the product 💰";
  }
  else if(type === "delivery"){
    reply = "We offer same-day delivery 🚚 (₱50 fee)";
  }
  else {
    reply = "Feel free to ask anything about our products 😊";
  }

  addBotMessage(reply);
}

// SEND MESSAGE
function sendMessage(){
  const input = document.getElementById("user-input");
  const text = input.value.trim();

  if(!text) return;

  addUserMessage(text);

  // SIMPLE AI RESPONSE
  let reply = "Sorry, I didn't understand that 😅";

  if(text.toLowerCase().includes("price")){
    reply = "Our products range from ₱90 to ₱180 💰";
  }
  else if(text.toLowerCase().includes("delivery")){
    reply = "Delivery fee is ₱50 🚚";
  }
  else if(text.toLowerCase().includes("cookie")){
    reply = "We have chocolate chip, oatmeal, and more 🍪";
  }

  setTimeout(()=> addBotMessage(reply), 500);

  input.value = "";
}

// ADD USER MESSAGE
function addUserMessage(text){
  const chat = document.getElementById("chat-body");
  chat.innerHTML += `<div class="bot-msg" style="background:#ff4d94">${text}</div>`;
}

// ADD BOT MESSAGE
function addBotMessage(text){
  const chat = document.getElementById("chat-body");
  chat.innerHTML += `<div class="bot-msg">${text}</div>`;
}

/* RUN ON LOAD */
function revealProducts(){
  const items = document.querySelectorAll(".product-item");

  items.forEach((item, index) => {
    const windowHeight = window.innerHeight;
    const itemTop = item.getBoundingClientRect().top;

    if(itemTop < windowHeight - 100){
      setTimeout(() => {
        item.classList.add("show");
      }, index * 150); // delay for stagger effect
    }
  });
}

window.addEventListener("scroll", revealProducts);

document.addEventListener("DOMContentLoaded", () => {
  revealProducts();
});

function revealSections(){
  const sections = document.querySelectorAll(".reveal");

  sections.forEach(section => {
    const windowHeight = window.innerHeight;
    const top = section.getBoundingClientRect().top;

    if(top < windowHeight - 100){
      section.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealSections);

document.addEventListener("DOMContentLoaded", () => {
  render();              // ✅ ONLY ONCE
  updateNavUser();       // ✅ login fix
  updateCartCount();     // ✅ cart count
  revealProducts();      // ✅ animation
  revealSections();      // ✅ sections
});

// Matcha Cookies 
function orderMatcha(){
  const product = {
    name: "Matcha Cookies",
    price: 130,
    img: "https://teakandthyme.com/wp-content/uploads/2023/09/matcha-white-chocolate-cookies-DSC_5105-1x1-1200.jpg"
  };

  localStorage.setItem("selectedProduct", JSON.stringify(product));

  window.location.href = "../pages/product-view.html";
}







