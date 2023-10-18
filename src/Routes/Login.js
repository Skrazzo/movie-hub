import React, { useState } from 'react';
import '../scss/login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { form_to_obj, get_form_object } from '../functions';



export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    function loginHandler(){
        const obj = get_form_object('login_form');
        if(obj.username === '' || obj.password === ''){
            setError(true);
        }

        if(!error){
            axios.post('login.php', form_to_obj('login_form')).then((res) => {
                if(res.data.code === 0){
                    setError(true);
                }else{
                    navigate('/');
                }

            });
        }
    }

    return (
        <div className='flex justify-center items-center text-white h-screen'>
            <div className='login-container'>
                <span className='header'>Sign <span className='orange-span'>In</span></span>

                <form id='login_form'>

                    <div className={(error) ? 'input-error' : 'input'}>
                        <label>Username</label>
                        <input onChange={() => setError(false)} name="username" />
                    </div>

                    <div className={(error) ? 'input-error' : 'input'}>
                        <label>Password</label>
                        <input onChange={() => setError(false)} name="password" type='password'/>
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
