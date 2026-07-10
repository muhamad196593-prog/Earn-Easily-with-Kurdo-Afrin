const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
        return;
    }

    alert("تم الضغط على زر تسجيل الدخول");
    // لاحقًا سنربطه بـ Firebase
});

registerBtn.addEventListener("click", () => {
    alert("سيتم فتح صفحة إنشاء الحساب");
    // لاحقًا:
    // window.location.href = "register.html";
});
