import './style.css';
import React, {useEffect, useState} from "react";
import Empty from '../shared/Empty.tsx';
import request from "../../api/requests.ts";
import QueryCard from './QueryCard.tsx'
import Loader from '../shared/Loader.tsx'
import {useTranslation} from 'react-i18next';


const Popular: React.FC = () => {
    const { t } = useTranslation();
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await request("GET", `query/popular`);
                setQueries(result);
            } catch (error) {
                console.error("Ошибка:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [])

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="popular-page">
            <header>
                <p className='first'><b>{t('popular.first')}</b></p>
                <p className='second'>{t('popular.second')}</p>
            </header>
            {queries.length > 0 ? (
                <div className="content">
                    {queries.map((query) => (
                        <QueryCard
                            key={query.id}
                            query_id={query.id}
                            parameters={query.parameters}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-content">
                    <Empty page="queries" />
                </div>
            )}
        </div>
    )
};

export default Popular;
