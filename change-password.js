import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  updatePassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const changeBtn = document.getElementById("changeBtn");

let currentUser = null;

onAuthStateChanged(auth, (user) => {

  if (!user) {
    alert("يرجى تسجيل الدخول أولاً");
    window.location.href = "index.html";
    return;
  }

  currentUser = user;

});

changeBtn.addEventListener("click", async () => {

  const password = newPassword.value.trim();
  const confirm = confirmPassword.value.trim();

  if (password.length < 6) {
    alert("يجب أن تكون كلمة المرور 6 أحرف على الأقل");
    return;
  }

  if (password !== confirm) {
    alert("كلمتا المرور غير متطابقتين");
    return;
  }

  try {

    await updatePassword(currentUser, password);

    alert("تم تغيير كلمة المرور بنجاح");

    window.location.href = "account.html";

  } catch (error) {

    if (error.code === "auth/requires-recent-login") {
      alert("لأسباب أمنية، يجب تسجيل الخروج ثم تسجيل الدخول مرة أخرى قبل تغيير كلمة المرور.");
    } else {
      alert(error.message);
    }

  }

});
