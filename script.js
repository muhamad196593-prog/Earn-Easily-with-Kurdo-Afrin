import { auth } from "./firebase.js";

import {
signInWithPopup. GoogleAuthProvider
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const registerBtn = document.getElementById("registerBtn");

alert("script.js يعمل");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");



function showLogin() {
    registerForm.style.display = "none";
    loginCard.style.display = "block";
}
window.showLogin = showLogin;


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

const googleLoginBtn = document.getElementById("googleLoginBtn");

const provider = new GoogleAuthProvider();

googleLoginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => {
      alert("تم تسجيل الدخول باستخدام Google");
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
