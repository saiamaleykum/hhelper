import './style.css';
import React, {useRef} from "react";
import {NavLink} from "react-router-dom";
import {animationIcons} from '../assets/menuIcons.tsx';
import {useTranslation} from 'react-i18next';


interface TabProps {
    tabName: string;
}

export const Tab = ({ tabName }: TabProps) => {
    const { t } = useTranslation();
    const lottieRef = useRef(null);

    const handleClick = () => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
        if (lottieRef.current) {
            lottieRef.current.stop();
            lottieRef.current.play();
        }
    };

    return (
        <div className="tab" onClick={handleClick}>
            <div className="animat">
                {animationIcons(lottieRef)[tabName]}
            </div>
            <div className="label">{t(tabName)}</div>
        </div>
    )
}

const Menu = () => {
    return (
        <div className="tabbar">
            <div className="menu-separator"/>
            <div className="tabs">
                <NavLink to={"/popular"}><Tab tabName="Popular"/></NavLink>
                <NavLink to={"/search"}><Tab tabName="Search"/></NavLink>
                <NavLink to={"/saved"}><Tab tabName="Saved"/></NavLink>
                <NavLink to={"/profile"}><Tab tabName="Profile"/></NavLink>
            </div>
        </div>

    )
}

export default Menu

