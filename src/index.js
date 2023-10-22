import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './Routes/Login';
import Register from './Routes/Register';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import Review from './Routes/Review';


const root = ReactDOM.createRoot(document.getElementById('root'));



domain_detect();

function domain_detect(){
    const currentDomain = window.location.hostname;
    const protocol = window.location.protocol;
    window.baseImgUrl = 'https://image.tmdb.org/t/p/original';
    
    window.baseApiUrl   = protocol + '//'+ currentDomain +'/movie-hub/api/'; // public url to your api files
    window.notification_color = '#FF9900';
    
    // default axios settings
    axios.defaults.baseURL = window.baseApiUrl;
    axios.defaults.withCredentials = true;
}

root.render(
    <MantineProvider>
        <Notifications />
        <HashRouter>
            <Routes>
                <Route index element={<App />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/review/:tmdb_id' element={<Review />}/>

            </Routes>
        </HashRouter>

    </MantineProvider>
);

