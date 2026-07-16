const language = localStorage.getItem("language") || "ar";

const translations = {
  ar: {
    home: "الرئيسية",
    earnings: "الأرباح",
    withdraw: "السحب",
    account: "الحساب"
  },

  ku: {
    home: "Mal",
    earnings: "Qazanc",
    withdraw: "Kişandin",
    account: "Hesab"
  },

  en: {
    home: "Home",
    earnings: "Earnings",
    withdraw: "Withdraw",
    account: "Account"
  }
};

document.querySelectorAll("[data-lang]").forEach(element => {
  const key = element.dataset.lang;

  if (translations[language][key]) {
    element.textContent = translations[language][key];
  }
});
