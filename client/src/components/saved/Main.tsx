import './style.css';
import React, {useEffect, useState} from "react";
import Empty from '../shared/Empty.tsx';
import request from "../../api/requests.ts";
import {tg} from '../../App.js'
import QueryCard from './QueryCard.tsx'
import Loader from '../shared/Loader.tsx'
import {useTranslation} from 'react-i18next';


const Saved: React.FC = () => {
    const { t } = useTranslation();
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await request("GET", `subscriptions/${tg.initDataUnsafe.user.id}`);
                setQueries(result);
            } catch (error) {
                console.error("Ошибка:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [])

   

      
    const removeQuery = (id: number) => {
        setQueries((prevQueries) => prevQueries.filter(query => query.id !== id));
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="saved-page">
            <header>
                <p className='first'><b>{t('saved.first')}</b></p>
                <p className='second'>{t('saved.second')}</p>
            </header>
            {queries.length > 0 ? (
                <div className="content">
                    {queries.map((query) => (
                        <QueryCard
                            key={query.id}
                            removeQuery={removeQuery}
                            {...query}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-content">
                    <Empty page="search" />
                </div>
            )}
            
        </div>
    )
};

export default Saved;
