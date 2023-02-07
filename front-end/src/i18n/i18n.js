import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  HEADER_EN,
  HEADER_VI,
  HOME_EN,
  HOME_VI,
  AUTH_EN,
  AUTH_VI,
  FOOTER_EN,
  FOOTER_VI,
  CART_EN,
  CART_VI,
  PROFILE_EN,
  PROFILE_VI,
  NOTFOUND_EN,
  NOTFOUND_VI,
  DETAIL_EN,
  DETAIL_VI,
} from "./locales";

const lang = localStorage.getItem("lang") || "vi";
// console.log("lang: ", lang);
export const locales = [
  {
    key: "en",
    title: "English",
  },
  {
    key: "vi",
    title: "Tiếng việt",
  },
];

const resources = {
  // en: {
  //   translation: en,
  // },
  en: {
    header: HEADER_EN,
    home: HOME_EN,
    auth: AUTH_EN,
    footer: FOOTER_EN,
    cart: CART_EN,
    profile: PROFILE_EN,
    notfound: NOTFOUND_EN,
    detail: DETAIL_EN,
  },
  vi: {
    header: HEADER_VI,
    home: HOME_VI,
    auth: AUTH_VI,
    footer: FOOTER_VI,
    cart: CART_VI,
    profile: PROFILE_VI,
    notfound: NOTFOUND_VI,
    detail: DETAIL_VI,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: "vi", // use en if detected lng is not available
    ns: [
      "header",
      "home",
      "auth",
      "footer",
      "cart",
      "profile",
      "notfound",
      "detail",
    ], // ns:nameSpace
    defaultNS: "translation",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
