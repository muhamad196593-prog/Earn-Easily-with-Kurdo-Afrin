import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const list = document.getElementById("notificationsList");

  const q = query(
    collection(db, "notifications"),
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, async (snapshot) => {

    list.innerHTML = "";

    if (snapshot.empty) {

      list.innerHTML = `
      <div class="notification">
        <div class="content">
          <h3>لا توجد إشعارات</h3>
          <p>ستظهر هنا جميع إشعاراتك.</p>
        </div>
      </div>
      `;

      return;
    }

    snapshot.forEach(async (item) => {

      const data = item.data();

      list.innerHTML += `
      <div class="notification ${data.read ? "" : "unread"}">
          <i class="fa-solid fa-bell icon"></i>

          <div class="content">
              <h3>${data.title}</h3>
              <p>${data.message}</p>
          </div>
      </div>
      `;

      if (!data.read) {
        await updateDoc(doc(db, "notifications", item.id), {
          read: true
        });
      }

    });

  });

});
