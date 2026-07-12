import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {

        document.getElementById("userName").innerText =
            user.displayName || "اسم المستخدم";

        document.getElementById("userEmail").innerText =
            user.email;

        document.getElementById("userId").innerText =
            "1000" + user.uid.substring(0, 2);

    } else {
        window.location.href = "index.html";
    }
});
