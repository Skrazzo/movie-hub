import React, { useState } from 'react';
import '../scss/login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { form_to_obj } from '../functions';


export default function Login() {
    const navigate = useNavigate();

    function loginHandler(){
        

        axios.post('login.php', form_to_obj('login_form')).then((res) => {
            console.log(res.data);
        });
    }

    return (
        <div className='flex justify-center items-center text-white h-screen'>
            <div className='login-container'>
                <span className='header'>Sign <span className='orange-span'>In</span></span>

                <form id='login_form'>

                    <div className='input'>
                        <label>Username</label>
                        <input name="username" />
                    </div>

                    <div className='input'>
                        <label>Password</label>
                        <input name="password" type='password'/>
                    </div>
                </form>

                <div>
                    <button onClick={loginHandler} className='btn-primary'>Login</button>
                </div>

                <span>Don't have an account? <span onClick={() => {navigate('/register')}} className='orange-span link'>Sign Up</span></span>
            </div>
        </div>
    )
}
