import './style.css';
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import request from "../../api/requests.ts";
import {tg} from '../../App.js'
import {PopularQueryItem} from '../../types/types.ts'
import {useTranslation} from 'react-i18next';


const QueryCard: React.FC<PopularQueryItem> = (props) => {
    const { t } = useTranslation();
    const { query_id, parameters} = props;
    const [resultText, setText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (parameters.text || parameters.area) {
            if (parameters.text) setText(parameters.text)
            if (parameters.area) setText((prevText) => `${prevText || ''} ${parameters.area!.name}`);
        } else {
            setText(t('global'))
        }
    }, [])

    const openQuery = async () => {
        const id = await request("GET", `subscription/${tg.initDataUnsafe.user.id}/${query_id}`); 
        const backPage = 'popular'
        navigate('/query-details', { state: {id, parameters, backPage} });
        document.querySelector('.tabbar')!.style.display = 'none';
    }

    return (
        <div className="query-card" onClick={openQuery}>
            <span className='name'>{resultText}</span>
        </div>
    )
};

export default QueryCard;
