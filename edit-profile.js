import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.addEventListener("DOMContentLoaded", () => {

  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const saveBtn = document.querySelector(".save-btn");

  if (!username || !email || !saveBtn) {
    alert("خطأ: لم يتم العثور على عناصر الصفحة");
    return;
  }

  let currentUser = null;

  onAuthStateChanged(auth, (user) => {

    if (!user) {
      alert("يرجى تسجيل الدخول أولاً");
      window.location.href = "index.html";
      return;
    }

    currentUser = user;

    username.value = user.displayName || "";
    email.value = user.email || "";
  });

  saveBtn.onclick = async function () {

    if (!currentUser) {
      alert("لم يتم تحميل بيانات المستخدم");
      return;
    }

    try {

      const newName = username.value.trim();

      await updateProfile(currentUser, {
        displayName: newName
      });

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          username: newName,
          email: currentUser.email
        },
        { merge: true }
      );

      alert("تم حفظ التعديلات بنجاح");

      window.location.href = "account.html";

    } catch (error) {

      console.error(error);

      alert(
        "Code: " + error.code + "\n\n" +
        error.message
      );

    }

  };

});
