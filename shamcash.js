import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

let currentUser = null;
let currentPoints = 0;

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        alert("يرجى تسجيل الدخول أولاً");
        window.location.href = "index.html";
        return;
    }

    currentUser = user;

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            alert("تعذر العثور على بيانات المستخدم");
            return;
        }

        const data = userSnap.data();

        currentPoints = Number(data.balance || 0);

        const usd = (currentPoints / 1000).toFixed(2);

        document.getElementById("balanceText").textContent = `${usd} USD`;

    } catch (error) {
        console.error(error);
    }
});

document.getElementById("withdrawBtn").addEventListener("click", async () => {

    const account = document.getElementById("uid").value.trim();
    const amount = Number(document.getElementById("amount").value);

    if (!account) {
        alert("أدخل رقم حساب شام كاش");
        return;
    }

    if (isNaN(amount) || amount < 0.10) {
        alert("الحد الأدنى للسحب هو 0.10 دولار");
        return;
    }

    const neededPoints = amount * 1000;

    if (currentPoints < neededPoints) {
        alert("رصيدك غير كافٍ");
        return;
    }

    try {

        await addDoc(collection(db, "withdrawRequests"), {
            uid: currentUser.uid,
            method: "ShamCash",
            account: account,
            amount: amount,
            points: neededPoints,
            status: "pending",
            createdAt: serverTimestamp()
        });

        await updateDoc(doc(db, "users", currentUser.uid), {
            balance: currentPoints - neededPoints
        });

        alert("تم إرسال طلب السحب بنجاح");

        location.reload();

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء إرسال الطلب");
    }

});
