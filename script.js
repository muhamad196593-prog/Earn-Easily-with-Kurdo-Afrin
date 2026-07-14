import { auth } from "./firebase.js";

import {
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", async () => {

    // اختبار أن الملف يعمل
    console.log("script.js loaded");

    // استكمال تسجيل الدخول بعد الرجوع من Google
    try {
        const result = await getRedirectResult(auth);

        if (result) {
            alert("تم تسجيل الدخول باستخدام Google");
            window.location.href = "home.html";
            return;
        }
    } catch (error) {
        console.error(error);
    }

    // زر تسجيل الدخول
    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");
                return;
            }

            try {
                await signInWithEmailAndPassword(auth, email, password);
                alert("تم تسجيل الدخول بنجاح");
                window.location.href = "home.html";
            } catch (error) {
                alert(error.message);
            }

        });
    }

    // زر إنشاء حساب
    const createAccountBtn = document.getElementById("createAccountBtn");

    if (createAccountBtn) {
        createAccountBtn.addEventListener("click", async () => {

            const email = document.getElementById("registerEmail").value.trim();
            const password = document.getElementById("registerPassword").value.trim();

            if (!email || !password) {
                alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");
                return;
            }

            try {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("تم إنشاء الحساب بنجاح");
                window.location.href = "home.html";
            } catch (error) {
                alert(error.message);
            }

        });
    }

    // إظهار نموذج تسجيل الدخول
    window.showLogin = function () {
        const loginCard = document.querySelector(".login-card");
        const registerForm = document.getElementById("registerForm");

        if (registerForm) registerForm.style.display = "none";
        if (loginCard) loginCard.style.display = "block";
    };

});
