let qty = 1;

//LOADING PRODUCT
function loadProduct(){
  const data = JSON.parse(localStorage.getItem("selectedProduct"));

  document.getElementById("product-name").innerText = data.name;
  document.getElementById("product-price").innerText = "₱" + data.price;
  document.getElementById("product-img").src = data.img;

  updateCart();
}

function changeQty(num){
  qty += num;
  if(qty < 1) qty = 1;
  document.getElementById("qty").innerText = qty;
}

// FUNCTION OF THE ADD CART
function addToCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const data = JSON.parse(localStorage.getItem("selectedProduct"));

  let existing = cart.find(i => i.name === data.name);

  if(existing){
    existing.qty += qty;
  } else {
    cart.push({
      name: data.name,
      price: data.price,
      img: data.img,
      qty: qty
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();

  // 🔥 THIS WAS MISSING
  showToast("Added to cart 🎉");
}

//UPDATING THE CART
function updateCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart").innerText = "" + cart.length;
}

//GO BACK 
function goBack(){
  window.history.back();
}

//GO TO CART
function goToCart(){
  localStorage.setItem("prevPage", "product");
  window.location.href = "../pages/cart.html";
}

//REHEATING GUIDE AND DELIVERY 
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".acc-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      item.classList.toggle("active"); 
    });
  });
});

//ADD TO CART MESSAGE 
function showToast(text){
  const toast = document.getElementById("toast");
  toast.innerText = text;
  toast.classList.add("show");

  setTimeout(()=>{
    toast.classList.remove("show");
  }, 2000);
}
document.addEventListener("DOMContentLoaded", loadProduct);