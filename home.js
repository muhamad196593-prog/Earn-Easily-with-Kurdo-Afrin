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

            const points = Number(data.balance) || 0;

            document.getElementById("points").textContent = points;

            const balance = (points / 1000).toFixed(2);

            const balanceElement = document.getElementById("balance");
            if (balanceElement) {
                balanceElement.textContent = `$${balance}`;
            }
        }
    } catch (error) {
        console.error(error);
    }
});
