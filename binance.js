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

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  loadBalance(user);

  document.getElementById("withdrawBtn").addEventListener("click", async () => {

    const uid = document.getElementById("uid").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    if (!uid) {
      alert("أدخل UID الخاص بـ Binance");
      return;
    }

    if (isNaN(amount) || amount < 0.10) {
      alert("أقل مبلغ للسحب هو 0.10 دولار");
      return;
    }

    try {

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("تعذر العثور على بيانات المستخدم");
        return;
      }

      const data = userSnap.data();

      const balance = Number(data.balance || 0);

      if (balance < amount * 1000) {
        alert("رصيدك غير كافٍ");
        return;
      }

      await addDoc(collection(db, "withdrawRequests"), {
        userId: user.uid,
        email: user.email,
        method: "Binance",
        uid: uid,
        amount: amount,
        status: "Pending",
        createdAt: serverTimestamp()
      });

      const newBalance = balance - (amount * 1000);

      await updateDoc(userRef, {
        balance: newBalance
      });

      document.getElementById("balanceText").textContent =
        `${(newBalance / 1000).toFixed(2)} USD`;

      document.getElementById("uid").value = "";
      document.getElementById("amount").value = "";

      alert("تم إرسال طلب السحب بنجاح");

    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء إرسال الطلب");
    }

  });

});

async function loadBalance(user) {

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;

  const data = userSnap.data();

  const balance = Number(data.balance || 0);

  document.getElementById("balanceText").textContent =
    `${(balance / 1000).toFixed(2)} USD`;

}
