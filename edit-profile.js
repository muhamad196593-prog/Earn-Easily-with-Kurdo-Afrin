import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const username = document.getElementById("username");
const email = document.getElementById("email");
const saveBtn = document.querySelector(".save-btn");

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

saveBtn.addEventListener("click", async () => {

  if (!currentUser) {
    alert("لم يتم تحميل بيانات المستخدم");
    return;
  }

  const newName = username.value.trim();

  if (newName === "") {
    alert("يرجى إدخال اسم المستخدم");
    return;
  }

  try {

    // تحديث الاسم في Firebase Authentication
    await updateProfile(currentUser, {
      displayName: newName
    });

    // حفظ البيانات في Firestore
    await setDoc(
      doc(db, "users", currentUser.uid),
      {
        username: newName,
        email: currentUser.email
      },
      { merge: true }
    );

    alert("✅ تم حفظ التعديلات بنجاح");

    window.location.href = "account.html";

  } catch (error) {

    console.error(error);

    alert(
      "حدث خطأ أثناء الحفظ\n\n" +
      "Code: " + error.code + "\n\n" +
      "Message: " + error.message
    );

  }

});
