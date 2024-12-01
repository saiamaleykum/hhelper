import './style.css';
import React from "react";
import {useNavigate} from "react-router-dom";
import bananaImage from '../../assets/svg/banana.svg'
import {useTranslation} from 'react-i18next';


const Empty = ({ page }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const goToPage = () => {
        navigate(`/${page}`);
    }

    return (
        <div className="empty">
            <img 
                    src={bananaImage} 
                    alt="Employer Photo" 
                />
            <p className="text">
                {page === "search" ? t('empty.text.search') : ''}
                {page === "popular" ? t('empty.text.popular') : ''}
            </p>
            <p className="link" onClick={goToPage}>
                {page === "search" ? t('empty.link.search') : ''}
                {page === "popular" ? t('empty.link.popular') : ''}
            </p>
        </div>
    )
};

export default Empty;