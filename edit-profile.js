import { auth, db } from "./firebase.js";

import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const username = document.getElementById("username");
const email = document.getElementById("email");
const saveBtn = document.querySelector(".save-btn");

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    email.value = user.email;
    username.value = user.displayName || "";

    saveBtn.onclick = async () => {

        try {

            await updateProfile(user, {
                displayName: username.value
            });

            await updateDoc(doc(db, "users", user.uid), {
                username: username.value
            });

            alert("تم حفظ التعديلات بنجاح");

            window.location.href = "account.html";

        } catch (error) {

            alert(error.message);

        }

    };

});
