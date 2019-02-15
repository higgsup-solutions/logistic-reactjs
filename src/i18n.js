import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {en} from "./i18n/en";
import {vn} from "./i18n/vn";
i18n
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: {
            en: en,
            vn: vn
        },
        fallbackLng: 'en',
        react: {
            wait: true,
            omitBoundRerenders: true
        }
    });

export default i18n;