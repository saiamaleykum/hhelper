import React, {useEffect} from "react";
import './style.css';
import bananaImage from '../../assets/svg/banana.svg'
import {tg} from '../../App.js';
import {formatDate, formatSalary} from '../../utils/main.ts'
import {useTranslation} from 'react-i18next';


// const Modal = ({active, setActive, props, callPage}) => {
const Modal = ({active, setActive, props}) => {
    const { t } = useTranslation();

    const handleClick = () => {
        tg.openLink(props.alternate_url)
    }

    useEffect(() => {
        if (active) {
            tg.MainButton.show();
            tg.MainButton.setText(t('button.open_vacancy'));
            tg.MainButton.onClick(handleClick);
            // document.querySelector('.tabbar').style.display = 'none';
        } else {
            tg.MainButton.hide();
            tg.MainButton.offClick(handleClick);
            // document.querySelector('.tabbar').style.display = 'block';
        }

        return () => {
            tg.MainButton.offClick(handleClick);
            tg.MainButton.hide();
        };
    }, [active]);

    return(
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {props && (
                    <>
                        <div className="modal-header">
                            <img 
                                src={props.employer.logo_urls?.original || bananaImage} 
                                alt="Employer Photo" 
                                className="modal-image"
                            />
                            <div className="modal-close" onClick={() => setActive(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="16.9497" y="5.63599" width="2" height="16" rx="1"
                                            transform="rotate(45 16.9497 5.63599)" fill="#9E9EA1"/>
                                    <rect x="18.3638" y="16.9497" width="2" height="16" rx="1"
                                            transform="rotate(135 18.3638 16.9497)" fill="#9E9EA1"/>
                                </svg>
                            </div>
                        </div>
                        <div className="modal-title">
                            <p>{props.name}</p>
                        </div>
                        <div className="modal-description">
                            <div className="modal-line modal-bottom-sep">
                                <div className="modal-var"><p>{t('modal.region')}</p></div>
                                <div className="modal-value"><p>{props.area.name}</p></div>
                            </div>
                            <div className="modal-line modal-bottom-sep">
                                <div className="modal-var"><p>{t('modal.salary')}</p></div>
                                <div className="modal-value"><p>{formatSalary(props.salary) || 'Не указано'}</p></div>
                            </div>
                            <div className="modal-line modal-bottom-sep">
                                <div className="modal-var"><p>{t('modal.experience')}</p></div>
                                <div className="modal-value"><p>{props.experience.name}</p></div>
                            </div>
                            <div className="modal-line modal-bottom-sep">
                                <div className="modal-var"><p>{t('modal.employment')}</p></div>
                                <div className="modal-value"><p>{props.employment.name}</p></div>
                            </div>
                            <div className="modal-line">
                                <div className="modal-var"><p>{t('modal.published_at')}</p></div>
                                <div className="modal-value"><p>{formatDate(props.published_at)}</p></div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Modal;