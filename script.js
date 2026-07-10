document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email === "" || password === "") {
            alert("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
            return;
        }

        alert("تم تسجيل الدخول بنجاح (تجريبي).");

        // لاحقًا سنستبدل هذا بربط Firebase الحقيقي
        // window.location.href = "home.html";
    });

    const registerBtn = document.querySelector(".register-btn");

    registerBtn.addEventListener("click", function () {
        alert("سيتم فتح صفحة إنشاء الحساب قريبًا.");
        // لاحقًا:
        // window.location.href = "register.html";
    });

});
