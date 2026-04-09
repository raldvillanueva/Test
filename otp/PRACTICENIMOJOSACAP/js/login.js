/* MESSAGE */
function showMsg(text){
  const msg = document.getElementById("msg");
  msg.innerText = text;
  msg.classList.add("show");

  setTimeout(()=> msg.classList.remove("show"), 2000);
}

/* REGISTER */
function register(){
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if(!fname || !lname || !email || !password){
    showMsg("Fill all fields");
    return;
  }

  let user = {fname, lname, email, password};

  localStorage.setItem("user", JSON.stringify(user));

  showMsg("Account created!");

  setTimeout(()=>{
    window.location.href = "login.html";
  }, 1500);
}

/* LOGIN */
function login(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    showMsg("No account found");
    return;
  }

  if(email === user.email && password === user.password){

    // 🔥 SAVE LOGIN SESSION
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    showMsg("Login successful");

    setTimeout(()=>{
      window.location.href = "homepage.html";
    }, 1200);

  } else {
    showMsg("Invalid credentials");
  }
}

/* NAV */
function goToRegister(){
  window.location.href = "../pages/register.html";
}

function goToLogin(){
  window.location.href = "../pages/login.html";
}

/* FORGOT */
function forgotPassword(){
  showMsg("Redirecting...");
  setTimeout(()=>{
    window.location.href = "../pages/forgot.html";
  }, 800);
}

function goBack(){
  window.location.href = "../pages/homepage.html";
}
