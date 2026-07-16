import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");

  if (userName) {
    userName.textContent = user.displayName || "اسم المستخدم";
  }

  if (userEmail) {
    userEmail.textContent = user.email;
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
