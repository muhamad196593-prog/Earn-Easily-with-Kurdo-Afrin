const currentLanguage = localStorage.getItem("language") || "ar";

document.documentElement.lang = currentLanguage;

if (currentLanguage === "ar") {
    document.documentElement.dir = "rtl";
} else if (currentLanguage === "ku") {
    document.documentElement.dir = "rtl";
} else {
    document.documentElement.dir = "ltr";
}

const translations = {
    ar: {
        home: "الرئيسية",
        earnings: "الأرباح",
        withdraw: "السحب",
        account: "الحساب",
        editProfile: "تعديل الملف الشخصي",
        changePassword: "تغيير كلمة المرور",
        changeLanguage: "تغيير اللغة",
        notifications: "الإشعارات",
        help: "مركز المساعدة",
        contact: "تواصل معنا",
        logout: "تسجيل الخروج"
    },

    ku: {
        home: "Mal",
        earnings: "Qazanc",
        withdraw: "Kişandin",
        account: "Hesab",
        editProfile: "Guherandina Hesabê",
        changePassword: "Guherandina Şîfreyê",
        changeLanguage: "Guherandina Ziman",
        notifications: "Agahdarî",
        help: "Navenda Alîkariyê",
        contact: "Têkilî",
        logout: "Derkeve"
    },

    en: {
        home: "Home",
        earnings: "Earnings",
        withdraw: "Withdraw",
        account: "Account",
        editProfile: "Edit Profile",
        changePassword: "Change Password",
        changeLanguage: "Change Language",
        notifications: "Notifications",
        help: "Help Center",
        contact: "Contact Us",
        logout: "Log Out"
    }
};

document.querySelectorAll("[data-lang]").forEach(item => {
    const key = item.dataset.lang;

    if (translations[currentLanguage][key]) {
        item.textContent = translations[currentLanguage][key];
    }
});
