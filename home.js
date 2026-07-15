import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

      document.getElementById("balance").textContent =
        (data.points || 0) + " نقطة";
    }

  } catch (error) {
    console.error(error);
  }
});
