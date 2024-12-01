import './style.css';
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import request from "../../api/requests.ts";
import {QueryItem} from '../../types/types.ts'
import {useTranslation} from 'react-i18next';


const QueryCard: React.FC<QueryItem> = (props) => {
    const { t } = useTranslation();
    const { id, parameters, removeQuery } = props;
    const [text, setText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (parameters.text || parameters.area) {
            if (parameters.text) setText(parameters.text)
            if (parameters.area) setText((prevText) => `${prevText || ''} ${parameters.area!.name}`);
        } else {
            setText(t('global'))
        }
    }, [])

    const deleteQuery = async () => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить?");
        if (isConfirmed) {
            await request("PATCH", `subscription/${id}/unsubscribe`);
            removeQuery(id);
        }
    }

    const openQuery = async () => {
        const backPage = 'saved'
        navigate('/query-details', { state: {id, parameters, backPage} });
        document.querySelector('.tabbar')!.style.display = 'none';
    }

    return (
        <div className="query-card" onClick={openQuery}>
            <span className='name'>{text}</span>
            <div className="close" onClick={(e) => { e.stopPropagation(); deleteQuery(); }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="16.9497" y="5.63599" width="2" height="16" rx="1"
                            transform="rotate(45 16.9497 5.63599)" fill="#9E9EA1"/>
                    <rect x="18.3638" y="16.9497" width="2" height="16" rx="1"
                            transform="rotate(135 18.3638 16.9497)" fill="#9E9EA1"/>
                </svg>
            </div>
        </div>
    )
};

export default QueryCard;
