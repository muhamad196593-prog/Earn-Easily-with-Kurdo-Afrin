import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

alert("تم تحميل account.js");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userId = document.getElementById("userId");

    if (userName) {
      userName.innerText = user.displayName || "اسم المستخدم";
    }

    if (userEmail) {
      userEmail.innerText = user.email;
    }

    if (userId) {
      userId.innerText = "1000" + user.uid.substring(0, 2);
    }
  } else {
    window.location.href = "index.html";
  }
});

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("تم تسجيل الخروج بنجاح");
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}
