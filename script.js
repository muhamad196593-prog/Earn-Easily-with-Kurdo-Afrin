import { auth } from "./firebase.js";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

alert("بدأ تحميل script.js");

document.addEventListener("DOMContentLoaded", () => {

    alert("script.js يعمل");

    // تسجيل الدخول
    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("تم تسجيل الدخول بنجاح");
                window.location.href = "home.html";
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    // عناصر التسجيل
    const loginCard = document.querySelector(".login-card");
    const registerForm = document.getElementById("registerForm");

    function showLogin() {
        registerForm.style.display = "none";
        loginCard.style.display = "block";
    }

    window.showLogin = showLogin;

    // إنشاء حساب
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

    // تسجيل الدخول بجوجل
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

});
