import { auth } from "./firebase.js";

import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", async () => {

    // استكمال تسجيل الدخول بعد الرجوع من Google
    try {
        const result = await getRedirectResult(auth);
        if (result) {
            alert("تم تسجيل الدخول باستخدام Google");
            window.location.href = "home.html";
        }
    } catch (error) {
        alert(error.message);
    }

    // تسجيل الدخول بالبريد
    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
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
    }

    // عناصر التسجيل
    const loginCard = document.querySelector(".login-card");
    const registerForm = document.getElementById("registerForm");

    function showLogin() {
        if (registerForm) registerForm.style.display = "none";
        if (loginCard) loginCard.style.display = "block";
    }

    window.showLogin = showLogin;

    // إنشاء حساب
    const createAccountBtn = document.getElementById("createAccountBtn");

    if (createAccountBtn) {
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
    }

    // تسجيل الدخول بجوجل
    const googleLoginBtn = document.getElementById("googleLoginBtn");
    const provider = new GoogleAuthProvider();

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener("click", () => {
            signInWithRedirect(auth, provider);
        });
    }

});
