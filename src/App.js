import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './scss/Main.scss';

import { useNavigate } from 'react-router-dom';
import Header from './Components/Header';

export default function App() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({username: 'Guest', pfp: ''});

    useEffect(() => {
        axios.post('check_login.php').then((res) => {
            if(res.data.code === 0){
                navigate('/login');
            }else{
                setUserInfo(res.data.reason);
            }
        });

        
    }, []);

    return (
        <>
            <Header username={userInfo.username} pfp={userInfo.pfp}/>
        </>
    )
}
