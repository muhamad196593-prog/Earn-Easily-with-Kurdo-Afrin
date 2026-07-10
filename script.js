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
function togglePassword(){

const password =
document.getElementById("password");

const icon =
document.querySelector(".toggle-password");

if(password.type==="password"){

password.type="text";

icon.classList.remove("fa-eye");
icon.classList.add("fa-eye-slash");

}else{

password.type="password";

icon.classList.remove("fa-eye-slash");
icon.classList.add("fa-eye");

}

}
