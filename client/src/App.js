import './App.css';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainRouter from"./router/Routes.tsx";
import { addUser } from './services/main.ts'
import { useTheme, useLanguage } from "./hooks/use-theme.ts";


const tg = window.Telegram.WebApp;

function App() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { lang, setLanguage } = useLanguage();

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.disableVerticalSwipes();
    tg.MainButton.hide();
    tg.BackButton.hide();
    (async () => {
      await addUser();
    })();
    
    navigate('/popular');
  }, [])

  return (
    <div className="container">
      <MainRouter/>
    </div>
  );
}

export default App;
export { tg };