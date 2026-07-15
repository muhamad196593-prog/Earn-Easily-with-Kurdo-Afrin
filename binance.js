alert("binance.js يعمل");

import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {

  alert("تم فحص تسجيل الدخول");

  if (!user) {
    alert("يرجى تسجيل الدخول أولاً");
    window.location.href = "index.html";
    return;
  }

  alert("المستخدم: " + user.email);

  document.getElementById("withdrawBtn").addEventListener("click", async () => {

    alert("تم الضغط على زر السحب");

    const uid = document.getElementById("uid").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    alert("UID: " + uid);
    alert("Amount: " + amount);

    if (!uid) {
      alert("أدخل UID الخاص بـ Binance");
      return;
    }

    if (isNaN(amount) || amount < 0.10) {
      alert("أقل مبلغ للسحب هو 0.10 دولار");
      return;
    }

    try {

      alert("قبل قراءة المستخدم");

      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      alert("بعد قراءة المستخدم");

      if (!userSnap.exists()) {
        alert("بيانات المستخدم غير موجودة");
        return;
      }

      const userData = userSnap.data();

      alert("الرصيد: " + userData.balance);

      if (userData.balance < amount) {
        alert("رصيدك غير كافٍ");
        return;
      }

      alert("سيتم إنشاء طلب السحب");

      await addDoc(collection(db, "withdrawRequests"), {
        userEmail: user.email,
        userId: user.uid,
        binanceUID: uid,
        amount: amount,
        method: "Binance",
        status: "Pending",
        createdAt: serverTimestamp()
      });

      alert("تم إنشاء طلب السحب");

      await updateDoc(userRef, {
        balance: userData.balance - amount,
        points: Math.round((userData.balance - amount) * 100)
      });

      alert("تم تحديث الرصيد");

      alert("تم إرسال طلب السحب بنجاح");

    } catch (error) {

      alert("خطأ:");
      alert(error.message);
      console.error(error);

    }

  });

});
