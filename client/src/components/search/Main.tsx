import './style.css';
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Empty from '../shared/Empty.tsx';
import request from "../../api/requests.ts";
import {tg} from '../../App.js'
import {useTranslation} from 'react-i18next';


type Item = {
    id: string; 
    name: string; 
};


const Search: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [isInputActive, setIsInputActive] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [regionSuggestions, setRegionSuggestions] = useState([]);

    // состояния для фильтров
    const [searchText, setSearchText] = useState<string>('');
    const [region, setRegion] = useState<Item>({ id: '', name: '' });

    /** Обработать ввод символа для получения подсказок (от 2 символов) */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.value;
        if (key === 'text') {
            setSearchText(value)
        } 
        if (key === 'area') {
            setQuery(value);
        } 

        if (value.length > 1) {
            fetchSuggestions(value, key);
        } else {
            setSuggestions([]);
            setRegionSuggestions([]);
        }
    };

    /** Вкл/выкл режим ввода, открыть/закрыть фильтры */
    const handleInputActive = (v: boolean) => {
        setIsInputActive(v);
        const tabbar = document.querySelector('.tabbar')!;
        if (v) {
            tabbar.style.display = 'none';
           
            tg.BackButton.show();
            tg.BackButton.onClick(() => handleInputActive(false));

            tg.MainButton.show();
            tg.MainButton.setText(t('button.search'));

            tg.SecondaryButton.show();
            tg.SecondaryButton.setText(t('button.save'));
            tg.SecondaryButton.setParams({position: "left"});
        } else {
            tabbar.style.display = 'block';
            setQuery('');
            setSearchText('')

            tg.BackButton.hide();
            tg.MainButton.hide();
            tg.SecondaryButton.hide();
        }
    }

    useEffect(() => {
        tg.MainButton.onClick(getAnalytics);
        tg.SecondaryButton.onClick(saveQuery);

        return () => {
            tg.SecondaryButton.offClick(saveQuery);
            tg.MainButton.offClick(getAnalytics);
        };
    }, [query, searchText]);

    useEffect(() => {

        return () => {
            tg.BackButton.hide();
            tg.MainButton.hide();
            tg.SecondaryButton.hide();
            tg.BackButton.offClick(() => handleInputActive(false));
            tg.SecondaryButton.offClick(saveQuery);
            tg.MainButton.offClick(getAnalytics);
        };
    }, []);

    /** Получить список подсказок для текущего введеного текста */
    const fetchSuggestions = async (value: string, key: string) => {
        if (key === 'text') {
            const response = await fetch(`https://api.hh.ru/suggests/vacancy_search_keyword?text=${value}`);
            const data = await response.json();

            // удаляем первый элемент из подсказок при совпадении
            const firstSuggestion = data.items[0]
            if (firstSuggestion && value.toLowerCase() === firstSuggestion.text.toLowerCase()) data.items.shift();

            setSuggestions(data.items);
        } 
        if (key === 'area') {
            const response = await fetch(`https://api.hh.ru/suggests/areas?text=${value}`);
            const data = await response.json();

            // заранее выбираем первый результат при совпадении (чтобы поиск сработал даже если явно не выбрать (не нажать) на элемент)
            const firstSuggestion = data.items[0]
            if (firstSuggestion && value.toLowerCase() === firstSuggestion.text.toLowerCase()) {
                setRegion({'id': firstSuggestion.id, 'name': firstSuggestion.text})
                data.items.shift();
            };
            setRegionSuggestions(data.items);
            setQuery(value);
        } 
    }

    /** Обработать нажатие на подсказку (сохранить для последующего запроса) */
    const clickSuggestion = (key: string, value: string, id?: string) => {
        if (key === 'text') {
            setSearchText(value);
            setSuggestions([]);
        }
        if (key === 'area') {
            setQuery(value);
            setRegion({'id': id!, 'name': value});
            setRegionSuggestions([]);
        };
    }

    /** Получить аналитику по запросу (количество вакансий, средняя/медианная зарплата) */
    const getAnalytics = async () => {
        if (query !== region.name) {
            alert(t('alert.region'))
            return
        }
        const isSearch = true;
        const parameters = {
            area: (region.id && region.name) ? region : undefined,
            text: searchText || undefined
        };
        navigate('/analytics', { state: {parameters, isSearch} })
        document.querySelector('.tabbar')!.style.display = 'none';
    }

    /** Сохранить запрос */
    const saveQuery = async () => {
        const data = {
            user_id: tg.initDataUnsafe.user.id,  
            query: {
                area: (region.id && region.name) ? region : undefined,
                text: searchText || undefined
            }
        };
        await request("POST", "query", data);
        navigate('/saved')
        document.querySelector('.tabbar')!.style.display = 'block';
    }

    /** Обработать нажатие кнопки "Ввод" на встроенной клавиатуре телефона */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            e.currentTarget.blur();
        }
    };

    return (
        <div className="search-page">
            <div className="search">
                <input 
                    className="search-input" 
                    type="text" 
                    placeholder={isInputActive ? t('search.text') : t('search.main')}
                    value={searchText}
                    onChange={(e) => handleInputChange(e, 'text')}
                    onFocus={() => handleInputActive(true)}
                    onBlur={() => setSuggestions([])}
                    onKeyDown={handleKeyDown}
                />
                {isInputActive && (
                    <p onClick={() => handleInputActive(false)}>{t('search.cancel')}</p>
                )}
            </div>

            {isInputActive && (
                <div className="filters">
                    <div className="search">
                        <input 
                            className="search-input" 
                            type="text" 
                            placeholder={t('search.region')}
                            value={query}
                            onChange={(e) => handleInputChange(e, 'area')}
                            onBlur={() => setRegionSuggestions([])}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <ul>
                        {suggestions.map((item) => (
                            <li
                                key={item.text}
                                onMouseDown={() => clickSuggestion('text', item.text)}
                            >
                                <p>{item.text}</p>
                            </li>
                        ))}
                        {regionSuggestions.map((item) => (
                            <li
                                key={item.id}
                                onMouseDown={() => clickSuggestion('area', item.text, item.id)}
                            >
                                <p>{item.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                
            )}

            {!isInputActive && (
                <Empty page="popular" />
            )}
            
        </div>
    )
};

export default Search;
