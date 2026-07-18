import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

  // عداد الإشعارات
  const bell = document.querySelector('a[href="notifications.html"]');

  if (bell) {

    let badge = document.createElement("span");
    badge.className = "notification-badge";
    badge.style.cssText = `
      background:red;
      color:white;
      border-radius:50%;
      font-size:11px;
      min-width:18px;
      height:18px;
      display:flex;
      align-items:center;
      justify-content:center;
      margin-right:auto;
    `;

    bell.appendChild(badge);

    const q = query(
      collection(db, "notifications"),
      where("uid", "==", user.uid),
      where("read", "==", false)
    );

    onSnapshot(q, (snapshot) => {

      const count = snapshot.size;

      if (count > 0) {
        badge.textContent = count;
        badge.style.display = "flex";
      } else {
        badge.style.display = "none";
      }

    });

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
