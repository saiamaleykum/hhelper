import './style.css';
import React, {useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {tg} from '../../App.js'
import Loader from '../shared/Loader.tsx'
import {useTranslation} from 'react-i18next';


const Analytics: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { id, parameters, backPage, isSearch } = location.state;

    const [loading, setLoading] = useState(true);
    const [salaryItems, setSalaryItems] = useState([]);
    const [countWithSalary, setCountWithSalary] = useState(0);
    const [countVacancies, setCountVacancies] = useState(0);
    
    const [averageSalary, setAverageSalary] = useState(0);
    const [medianSalary, setMedianSalary] = useState(0);

    const goBack = () => {
        if (isSearch) {
            navigate('/search');
            document.querySelector('.tabbar')!.style.display = 'block';
            tg.BackButton.hide();
        } else {
            navigate('/query-details', { state: {id, parameters, backPage} });
        }
    }

    const fetchAnalytics = async () => {
        try {
            let URL = `https://api.hh.ru/vacancies?per_page=0&clusters=true&currency=BYR`
            // let URL = `https://api.hh.ru/vacancies?per_page=0&clusters=true&experience=between1And3`
            if (parameters.text) URL+=`&text=${parameters.text}`
            if (parameters.area?.name) URL+=`&area=${parameters.area.id}`

            const response = await fetch(URL);
            const data = await response.json();
            setCountVacancies(data.found)
            const clusterSalary = data.clusters.find(cluster => cluster.id === "salary")?.items || []
            setSalaryItems(clusterSalary)
            ZP(clusterSalary)
        } catch (error) {
            console.error("Ошибка:", error);
        } finally {
            setLoading(false);
        }
    }

    const ZP = (salaryItems) => { // TODO сделать в отдельной функции
        const countWithSalary = salaryItems.find(item => item.name === "Указан")?.count
        console.log('Колво вакансий с указанной зп: ', countWithSalary) 
        setCountWithSalary(countWithSalary || 0)
        const filteredData = salaryItems.filter((item) => item.name !== "Указан");
        console.log(filteredData);

        // если меньще 2 то недостаточно данных
        let totalSum = 0;
        if (filteredData.length < 2) {
            alert(t('alert.nodata'))
            return
        }
        for (let [index, item] of filteredData.entries()) {
            const currentSum = item.name.match(/\d+/);
            const amount = parseInt(currentSum[0], 10);
            if (index === filteredData.length - 1) {
                console.log('от ', amount, ' - ', item.count, ' | ', (amount * item.count)); 
                totalSum += (amount * item.count)
            } else {
                if (index === 0) {
                    console.log('до ', amount, ' - ', countWithSalary - item.count, ' | ', (amount * (countWithSalary - item.count))); 
                    totalSum += (amount * (countWithSalary - item.count))
                }
                const nextSum = filteredData[index+1].name.match(/\d+/);
                const nextAmount = parseInt(nextSum[0], 10);
                const amountBetweenInterval = item.count - filteredData[index+1].count
                console.log(amount, ' - ', nextAmount, ' | ', amountBetweenInterval, ' | ', (amount  + nextAmount) / 2 * amountBetweenInterval); 
                totalSum += (amount  + nextAmount) / 2 * amountBetweenInterval
            }  
        }

        console.log("Итоговая сумма для средней зп: ", totalSum)
        console.log("Cредняя зп: ", totalSum / countWithSalary)
        setAverageSalary(Math.round(totalSum / countWithSalary))
    }

    useEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(goBack);

        (async () => {
            await fetchAnalytics();
        })();

        

        return () => {
            tg.BackButton.offClick(goBack);
        };
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="query-analytics">
            <header>
                <p className='first'><b>{t('analytics.first')}</b></p>
                <p className='second'>{t('analytics.second')}</p>
            </header>        
            <div className="content">
                <div className="item">
                    <strong>{t('analytics.countVacancies')}</strong> {countVacancies}
                </div>
                <div className="item">
                    <strong>{t('analytics.countWithSalary')}</strong> {countWithSalary}
                </div>
                <div className="item">
                    <strong>{t('analytics.averageSalary')}</strong> {averageSalary} BYN
                </div>
                {/* <div className="item">
                    <strong>{t('analytics.medianSalary')}</strong> {}
                </div> */}
            </div>
        </div>
    )
};

export default Analytics;
