import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

alert("تم تحميل edit-profile.js");

const username = document.getElementById("username");
const email = document.getElementById("email");
const saveBtn = document.querySelector(".save-btn");

let currentUser = null;

onAuthStateChanged(auth, (user) => {

  if (!user) {
    alert("لم يتم تسجيل الدخول");
    window.location.href = "index.html";
    return;
  }

  currentUser = user;

  username.value = user.displayName || "";
  email.value = user.email || "";

});

if (saveBtn) {

  saveBtn.addEventListener("click", async () => {

    if (!currentUser) {
      alert("لم يتم تحميل بيانات المستخدم");
      return;
    }

    try {

      await updateProfile(currentUser, {
        displayName: username.value.trim()
      });

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          username: username.value.trim(),
          email: currentUser.email
        },
        { merge: true }
      );

      alert("تم حفظ التعديلات بنجاح");

      window.location.href = "account.html";

    } catch (error) {

      console.error(error);
      alert("خطأ:\n" + error.message);

    }

  });

} else {

  alert("زر الحفظ غير موجود");

}
