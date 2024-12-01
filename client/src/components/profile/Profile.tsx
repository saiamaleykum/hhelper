import './style.css';
import React, {useEffect, useState} from "react";
import {tg} from '../../App.js'
import { useTheme, useLanguage } from "../../hooks/use-theme.ts";
import Empty from "../shared/Empty.tsx";
import {themeIcons} from '../../assets/themeIcons.tsx'
import request from "../../api/requests.ts";
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from "react-router-dom";
import Loader from "../shared/Loader.tsx";



const Profile = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);

    const { theme, setTheme } = useTheme();
    const { lang, setLanguage } = useLanguage();

    const switchLanguage = () => {
        setLanguage((lang) => (lang === "en" ? "ru" : "en"));
    };

    const switchTheme = () => {
        setTheme((theme) => (theme === "dark" ? "light" : "dark"));
    }


    const user = tg.initDataUnsafe.user;

    // const [user, setUser] = useState();

    useEffect(() => {
        console.log(tg.initDataUnsafe)
        setLoading(false)
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="profile">
            <header>
                <div className="info">
                    <div className="photo">
                        <img src={user.photo_url} alt={"User Photo"}/>
                    </div>
                    <div className="details">
                        <div className="name">
                            <p>{user?.first_name || 'Anonymous'}</p>
                        </div>
                    </div>
                </div>
            </header>
            <Empty page="popular" />
            <div className="switch">
                <div className="segment" onClick={switchTheme}>
                    <div className={`button ${theme === "light" ? "active" : ""}`}>
                        {themeIcons['light']}
                    </div>
                    <div className={`button ${theme === "dark" ? "active" : ""}`}>
                        {themeIcons['dark']}
                    </div>
                </div>
                <div className="segment" onClick={switchLanguage}>
                    <div className={`button ${lang === "en" ? "active" : ""}`}>
                        EN
                    </div>
                    <div className={`button ${lang === "ru" ? "active" : ""}`}>
                        RU
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;