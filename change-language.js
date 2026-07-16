const languageSelect = document.getElementById("language");
const saveButton = document.getElementById("saveLanguage");

// تحميل اللغة المحفوظة
const savedLanguage = localStorage.getItem("language");

if (savedLanguage) {
  languageSelect.value = savedLanguage;
}

saveButton.addEventListener("click", () => {

  const selectedLanguage = languageSelect.value;

  localStorage.setItem("language", selectedLanguage);

  alert("تم حفظ اللغة بنجاح");

  window.location.href = "account.html";

});
