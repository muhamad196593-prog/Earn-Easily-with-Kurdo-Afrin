import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const data = userSnap.data();

        const points = data.balance || 0;

        document.getElementById("points").innerHTML =
            `${points} <span>نقطة</span>`;

        document.getElementById("balance").textContent =
            `$${(points / 1000).toFixed(2)}`;
    }
});
