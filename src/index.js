import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './Routes/Login';
import Register from './Routes/Register';


const root = ReactDOM.createRoot(document.getElementById('root'));



domain_detect();

function domain_detect(){
    const currentDomain = window.location.hostname;
    const protocol = window.location.protocol;
    
    window.baseApiUrl   = protocol + '//'+ currentDomain +'/movie-hub/api/'; // public url to your api files
    
    // default axios settings
    axios.defaults.baseURL = window.baseApiUrl;
    axios.defaults.withCredentials = true;
}

root.render(
    
    <HashRouter>
        <Routes>
            <Route index element={<App />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>

        </Routes>
    </HashRouter>
);

