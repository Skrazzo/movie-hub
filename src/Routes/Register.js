import React from 'react';
import '../scss/login.scss';
import { useNavigate } from 'react-router-dom';
import { form_to_obj } from '../functions';
import axios from 'axios';


export default function Login() {
    const navigate = useNavigate();
    
    function registerHandler(){
        
        

        axios.post('register.php', form_to_obj('register_form')).then((res) => {
            console.log(res);
        });
    }

    return (
        <div className='flex justify-center items-center text-white h-screen'>
            <div className='login-container'>
                <span className='header'>Sign <span className='orange-span'>Up</span></span>
                
                <form id='register_form'>
                    <div className='input'>
                        <label>Username</label>
                        <input name='username'/>
                    </div>
                    
                    <div className='input'>
                        <label>Password</label>
                        <input type='password' name='password'/>
                    </div>

                    <div className='input'>
                        <label>Repeat Password</label>
                        <input type='password' name='re-password'/>
                    </div>

                </form>

                <div>
                    <button onClick={registerHandler} className='btn-primary'>Register</button>
                </div>

                <span>Already have an account? <span onClick={() => {navigate('/login')}} className='orange-span link'>Sign In</span></span>
            </div>
        </div>
    )
}
