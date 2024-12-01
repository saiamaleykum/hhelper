import React from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout.tsx";
import Search from "../components/search/Main.tsx";
import Saved from "../components/saved/Main.tsx";
import QueryDetails from "../components/saved/QueryDetails.tsx";
import Vacancies from '../components/vacancies/Main.tsx'
import Analytics from '../components/analytics/Main.tsx'
import Popular from "../components/popular/Main.tsx";
import Profile from "../components/profile/Profile.tsx";



 const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="popular" element={<Popular/>}/>
                <Route path="search" element={<Search/>}/>
                <Route path="saved" element={<Saved/>}/>
                <Route path="profile" element={<Profile/>}/>
        
                <Route path="query-details" element={<QueryDetails/>}/>
                <Route path="vacancies" element={<Vacancies/>}/>
                <Route path="analytics" element={<Analytics/>}/>
            </Route>
        </Routes>
    )
}

export default MainRouter