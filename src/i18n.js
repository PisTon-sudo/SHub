import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "services": "Services",
      "about": "About",
      "contact": "Contact",
      "faq": "FAQ",
      "explore_services": "Explore Services",
      "sign_up": "Sign Up",
      "ready_cta": "Ready to get started?",
      "join_cta": "Create an account and discover professionals ready to help."
    }
  },
  es: {
    translation: {
      "home": "Inicio",
      "services": "Servicios",
      "about": "Acerca",
      "contact": "Contacto",
      "faq": "Preguntas",
      "explore_services": "Explorar servicios",
      "sign_up": "Regístrate",
      "ready_cta": "¿Listo para empezar?",
      "join_cta": "Crea una cuenta y descubre profesionales listos para ayudar."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;