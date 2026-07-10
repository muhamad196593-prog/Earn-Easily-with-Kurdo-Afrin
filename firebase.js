import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUgc2Hx_VvQR8YxvgdBgCCCTmWpRthL90",
  authDomain: "earn-easily-with-kurdo-afrin.firebaseapp.com",
  projectId: "earn-easily-with-kurdo-afrin",
  storageBucket: "earn-easily-with-kurdo-afrin.firebasestorage.app",
  messagingSenderId: "780391601604",
  appId: "1:780391601604:web:e965494aa0f83bbf0ec091"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
