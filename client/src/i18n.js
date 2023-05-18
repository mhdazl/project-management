import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import translationEN from "./locales/en.json";
import translationFR from "./locales/de.json";

// Configure i18next
i18n.use(initReactI18next).init({
  lng: "en", // Set the default language
  fallbackLng: "en", // Use English if translation is missing for the selected language
  resources: {
    en: {
      translation: translationEN,
    },
    de: {
      translation: translationFR,
    },
    // Add more languages and translations as needed
  },
  // Other configuration options if necessary
});

export default i18n;
