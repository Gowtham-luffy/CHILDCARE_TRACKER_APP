import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: {
    login: "Login",
    email: "Email",
    password: "Password",
    motherDashboard: "Mother Dashboard",
    vaccinesDue: "Vaccines Due",
    appointments: "Appointments",
    bookAppointment: "Book Appointment",
    addGrowth: "Add Growth",
    logout: "Logout"
  }},
  ta: { translation: {
    login: "உள்நுழைக",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    motherDashboard: "அம்மா பலகை",
    vaccinesDue: "எதிர்பார்க்கப்படும் தடுப்பூசிகள்",
    appointments: "நியமனங்கள்",
    bookAppointment: "நியமனத்தைப் பதிவு செய்",
    addGrowth: "வளர்ச்சி சேர்க்கவும்",
    logout: "வெளியேறு"
  }}
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
