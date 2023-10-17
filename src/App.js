import axios from 'axios';
import React, { useEffect } from 'react';
import './scss/App.scss';
import { useNavigate } from 'react-router-dom';

export default function App() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('check_login.php').then((res) => {
            if(res.data.code === 0){
                navigate('/login');
            }
        });
    }, []);

    return (
        <></>
    )
}
