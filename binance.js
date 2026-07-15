import { auth, db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.getElementById("withdrawBtn").addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) {
        alert("يرجى تسجيل الدخول أولاً");
        return;
    }

    const uid = document.getElementById("uid").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    if (uid === "") {
        alert("أدخل UID الخاص بـ Binance");
        return;
    }

    if (isNaN(amount) || amount < 0.10) {
        alert("أقل مبلغ للسحب هو 0.10 دولار");
        return;
    }

    try {
        await addDoc(collection(db, "withdrawRequests"), {
            userEmail: user.email,
            binanceUID: uid,
            amount: amount,
            method: "Binance",
            status: "Pending",
            createdAt: serverTimestamp()
        });

        alert("تم إرسال طلب السحب بنجاح");

        document.getElementById("uid").value = "";
        document.getElementById("amount").value = "";

    } catch (error) {
        alert(error.message);
    }

});
