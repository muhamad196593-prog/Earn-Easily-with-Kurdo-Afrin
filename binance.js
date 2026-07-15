import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();

            // عدد النقاط المخزن في Firebase
            const points = Number(data.balance || 0);

            // تحويل النقاط إلى دولار
            const usd = (points / 1000).toFixed(2);

            // عرض الرصيد في الصفحة
            const balanceText = document.getElementById("balanceText");

            if (balanceText) {
                balanceText.textContent = `${usd} USD`;
            }

        } else {
            const balanceText = document.getElementById("balanceText");
            if (balanceText) {
                balanceText.textContent = "0.00 USD";
            }
        }

    } catch (error) {
        console.error("خطأ:", error);

        const balanceText = document.getElementById("balanceText");
        if (balanceText) {
            balanceText.textContent = "0.00 USD";
        }
    }
});
