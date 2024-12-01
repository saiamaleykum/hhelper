import './style.css';
import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import request from "../../api/requests.ts";
import {tg} from '../../App.js'
import {formatDate} from '../../utils/main.ts'
import Loader from '../shared/Loader.tsx'
import {useTranslation} from 'react-i18next';


const QueryDetails: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { id, parameters, backPage } = location.state;
    const [loading, setLoading] = useState(true);
    const [lastUpdateTime, setLastUpdateTime] = useState('');

    const goBack = () => {
        navigate(`/${backPage}`);
        document.querySelector('.tabbar').style.display = 'block';
        tg.BackButton.hide();
    }
  
    useEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(goBack);

        (async () => {
            try {
                const result = await request("GET", `subscription/time/${id}`);
                setLastUpdateTime(result.last_update_time);
            } catch (error) {
                console.error("Ошибка:", error);
            } finally {
                setLoading(false);
            }
        })();

    

        return () => {
            tg.BackButton.offClick(goBack);
        };
    }, []);

    const getVacancies = (status: 'all' | 'new') => {
        navigate('/vacancies', { state: {id, parameters, status, lastUpdateTime, backPage} });
        if (status === 'new') {
            (async () => {
                await request("PATCH", `subscription/time/${id}`);
            })();
        }
    }

    const getAnalytics = () => {
        const isSearch = false;
        navigate('/analytics', { state: {id, parameters, backPage, isSearch} })
    }
    
    if (loading) {
        return <Loader />;
    }
    
    return (
        <div className="query-details">
            <div className="content">
                <p>
                    <strong>{t('details.text')}</strong> {parameters.text || t('details.unknown')}
                </p>
                <p>
                    <strong>{t('details.region')}</strong> {parameters.area?.name || t('details.unknown')}
                </p>
                <p>
                    <strong>{t('details.lastUpdate')}</strong> {formatDate(lastUpdateTime)}
                </p>
                <div className="buttons">
                    <button onClick={() => getVacancies('all')} className="button all-button">
                        {t('details.button.all')}
                    </button>
                    <button onClick={() => getVacancies('new')} className="button new-button">
                        {t('details.button.new')}
                    </button>
                </div>
                <button onClick={getAnalytics} className="button analytics-button">
                    {t('details.button.analytics')}
                </button>
            </div>

        </div>
    )
};

export default QueryDetails;
