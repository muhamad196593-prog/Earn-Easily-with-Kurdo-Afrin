import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();

    document.querySelector(".balance-text h2").textContent =
      data.balance.toFixed(2) + " $";

    document.querySelector(".balance-text p").textContent =
      data.points + " نقطة";
  }
});
