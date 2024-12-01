import './style.css';
import React, {useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {tg} from '../../App.js'
import Item from "./Item.tsx";
import Modal from '../shared/Modal.tsx'
import {useTranslation} from 'react-i18next';


const Vacancies: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { id, parameters, status, lastUpdateTime, backPage } = location.state;
    const [vacancies, setVacancies] = useState<any[]>([]);
    const [countCacancies, setCountVacancies] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    
    const goBack = () => {
        navigate('/query-details', { state: {id, parameters, backPage} });
    }

    const fetchVacancies = async () => {
        let URL = `https://api.hh.ru/vacancies?per_page=100`
        if (parameters.text) URL+=`&text=${parameters.text}`
        if (parameters.area?.name) URL+=`&area=${parameters.area.id}`

        if (status === 'new') {
            if (!lastUpdateTime) {
                goBack()
                return
            }
            URL+=`&date_from=${lastUpdateTime}&order_by=publication_time`
        }
        const response = await fetch(URL);
        const data = await response.json();
        setVacancies(data.items)
        setCountVacancies(data.found)
    }



    useEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(goBack);
        (async () => {
            await fetchVacancies()
        })();
        return () => {
            tg.BackButton.offClick(goBack);
        };
    }, []);

    return (
        <div className="vacancies">
            <span className='count'>
                {t('vacancies.count')} {countCacancies}
            </span>
            <div className="content">
                {vacancies.map((vacancy, index) => (
                    <Item 
                        key={index} 
                        modalActive={modalActive} 
                        setModalActive={setModalActive}
                        setModalContent={setModalContent}
                        {...vacancy} />
                ))}
            </div>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                props={modalContent}
            />
        </div>
    )
};

export default Vacancies;
