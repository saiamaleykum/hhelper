import {useLayoutEffect, useState} from "react";
import {useTranslation} from "react-i18next";


const tg = window.Telegram.WebApp;
const userLanguage = tg.initDataUnsafe.user.language_code;
const defaultLanguage = ["en", "ru"].includes(userLanguage) ? userLanguage : "en";

export const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || tg.colorScheme);

    useLayoutEffect(() => {
        const headerColor = theme === 'light' ? '#FFFFFF' : '#1C1C1E';
        const bottomBarColor = theme === 'light' ? '#F1F1F2' : '#1E1E1E';

        tg.setHeaderColor(headerColor);
        tg.setBackgroundColor(headerColor)
        tg.setBottomBarColor(bottomBarColor);

        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    return {theme, setTheme};
}

export const useLanguage = () => {
    const { i18n } = useTranslation();

    const [lang, setLanguage] = useState(localStorage.getItem('app-language') || defaultLanguage);

    useLayoutEffect(() => {
        i18n.changeLanguage(lang);
        localStorage.setItem('app-language', lang);
    }, [lang]);

    return {lang, setLanguage};
}