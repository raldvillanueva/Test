const products = [
  {
    name: "Chocolate Chip Cookies",
    price: 120,
    img: "https://www.meatloafandmelodrama.com/wp-content/uploads/2024/10/best-chocolate-chip-cookies-recipe.jpg",
    category: "cookie"
  },
  {
    name: "Oatmeal Cookies",
    price: 100,
    img: "https://whatsgabycooking.com/wp-content/uploads/2023/04/WGC-__-Oatmeal-Chocolate-Chip-Cookies-1200x800-1.jpg",
    category: "cookie"
  },
  {
    name: "Matcha Cookies",
    price: 130,
    img: "https://teakandthyme.com/wp-content/uploads/2023/09/matcha-white-chocolate-cookies-DSC_5105-1x1-1200.jpg",
    category: "cookie"
  },
  {
    name: "Fudge Brownies",
    price: 150,
    img: "https://cafedelites.com/wp-content/uploads/2016/08/Fudgy-Cocoa-Brownies-44-1.jpg",
    category: "brownie"
  },
  {
    name: "Dark Chocolate Brownies",
    price: 160,
    img: "https://organicallyaddison.com/wp-content/uploads/2022/09/2022-09-04_17-44-12_390.jpeg",
    category: "brownie"
  },
  {
    name: "Red Velvet Brownies",
    price: 180,
    img: "https://cakesbymk.com/wp-content/uploads/2025/02/Template-Size-for-Blog-21.jpg",
    category: "brownie"
  },
  {
    name: "Vanilla Cupcake",
    price: 90,
    img: "https://clipart-library.com/2024/image-of-a-cupcake/image-of-a-cupcake-4.jpg",
    category: "cupcake"
  },
  {
    name: "Chocolate Cupcake",
    price: 100,
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    category: "cupcake"
  },
  {
    name: "Strawberry Cupcake",
    price: 110,
    img: "https://images.unsplash.com/photo-1607478900766-efe13248b125",
    category: "cupcake"
  },
  {
    name: "Chocolate Chip Cookies Box",
    price: 110,
    img: "https://www.thesevenpantry.com/cdn/shop/files/TSP-50-Shades-FOOD-Cookies-in-a-Box.jpg?v=1700633437&width=800",
    category: "box"
  },
  {
    name: "Fudge Brownies Box",
    price: 110,
    img: "https://cravingskitchenph.com/cdn/shop/files/DSCF6636.jpg?v=1721989391",
    category: "box"
  },
  {
    name: "Red Velvet Brownies Box",
    price: 110,
    img: "https://freshaprilflours.com/wp-content/uploads/2020/02/red-velvet-brownies-9.jpg",
    category: "box"
  }
];

function render(list){
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  list.forEach(p=>{
    container.innerHTML += `
      <div class="product-clean"
          onclick="viewProduct('${p.name}','${p.price}','${p.img}')">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p class="price">₱${p.price}</p>
      </div>
    `;
  });
}

/* FILTER */
function filterProducts(type){

  // 🔥 SHOW PRODUCTS AGAIN
  document.querySelector(".products").style.display = "block";

  // 🔥 HIDE FAQ / CONTACT
  document.querySelectorAll(".about-section").forEach(s=>{
    s.classList.remove("active");
  });

  let filtered = type === "all"
    ? products
    : products.filter(p => p.category === type);

  render(filtered);
}

/* CART */
function addProduct(name, price, img){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(i=>i.name === name);

  if(existing){
    existing.qty++;
  } else {
    cart.push({name,price,img,qty:1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart").innerText = cart.length;
}

/* NAV */
function goHome(){
  window.location.href = "../pages/homepage.html";
}

function goToCart(){
  window.location.href = "../pages/cart.html";
}

function goBack(){
  window.location.href = "../pages/homepage.html";
}

/* VIEWPRODUCT */
function viewProduct(name, price, img){
  const product = {name, price, img};
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "../pages/product-view.html";
}

function revealOnScroll(){
  const items = document.querySelectorAll(".product-clean");

  const trigger = window.innerHeight * 0.85;

  items.forEach(item=>{
    const top = item.getBoundingClientRect().top;

    if(top < trigger){
      item.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

document.addEventListener("DOMContentLoaded", ()=>{
  render(products);
  updateCart();

  setTimeout(revealOnScroll, 100); // 🔥 ensures visible on load
});

window.addEventListener("scroll", revealOnScroll);

/* INIT */
document.querySelectorAll(".dropdown span").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const menu = btn.nextElementSibling;

    document.querySelectorAll(".dropdown-menu").forEach(m=>{
      if(m !== menu) m.style.display = "none";
    });

    menu.style.display =
      menu.style.display === "block" ? "none" : "block";
  });
});

/* click outside = close */
document.addEventListener("click", (e)=>{
  if(!e.target.closest(".dropdown")){
    document.querySelectorAll(".dropdown-menu").forEach(m=>{
      m.style.display = "none";
    });
  }
});

/* SHOW SECTION */
function showSection(type){

  // hide products
  document.querySelector(".products").style.display = "none";

  // hide all sections
  document.querySelectorAll(".about-section").forEach(s=>{
    s.classList.remove("active");
  });

  // show selected
  if(type === "faq"){
    document.getElementById("faqSection").classList.add("active");
  }

  if(type === "contact"){
    document.getElementById("contactSection").classList.add("active");
  }

}

/* SHOW PRODUCTS2 */
function showProducts(){

  // show products
  document.querySelector(".products").style.display = "block";

  // hide other sections
  document.querySelectorAll(".about-section").forEach(s=>{
    s.classList.remove("active");
  });

  // render all again
  render(products);
}

// SELECTED PRODUCT 
const selected = localStorage.getItem("selectedCategory") || "all";

filterProducts(selected);
