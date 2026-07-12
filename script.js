import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

loginBtn.addEventListener("click", () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("تم تسجيل الدخول بنجاح");
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert(error.message);
    });

});

function togglePassword() {

  const password = document.getElementById("password");
  const icon = document.querySelector(".toggle-password");

  if (password.type === "password") {
    password.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }

}

window.togglePassword = togglePassword;

const loginCard = document.querySelector(".login-card");
const registerForm = document.getElementById("registerForm");
const registerBtn = document.getElementById("registerBtn");

registerBtn.onclick = function () {
    loginCard.style.display = "none";
    registerForm.style.display = "block";
};

function showLogin() {
    registerForm.style.display = "none";
    loginCard.style.display = "block";
}
window.showLogin = showLogin;

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const createAccountBtn = document.getElementById("createAccountBtn");

createAccountBtn.addEventListener("click", () => {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("تم إنشاء الحساب بنجاح");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});
