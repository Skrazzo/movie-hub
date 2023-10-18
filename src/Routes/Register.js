import React, { useEffect, useState } from 'react';
import '../scss/login.scss';
import { useNavigate } from 'react-router-dom';
import { areAllValuesFalse, form_to_obj, get_form_object, is_valid_img_link } from '../functions';
import axios from 'axios';


export default function Login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({username: false, password: false, pfp: false});
    
    function registerHandler(){
        const obj = get_form_object('register_form');
        var form_errors = errors;

        if(obj.password !== obj.re_password || obj.password === ''){
            form_errors.password = true;
        }

        if(!is_valid_img_link(obj.pfp)){
            form_errors.pfp = true;
        }

        if(areAllValuesFalse(form_errors)){  // check if theres no errors

            axios.post('register.php', form_to_obj('register_form')).then((res) => {
                if(res.data.code === 0){
                    form_errors.username = true;
                    setErrors({...errors, ...form_errors});
                }else{
                    navigate('/');
                }
            });

        }else{
            setErrors({...errors, ...form_errors});
        }

    }

    

    

    return (
        <div className='flex justify-center items-center text-white h-screen'>
            <div className='login-container'>
                <span className='header'>Sign <span className='orange-span'>Up</span></span>
                
                <form id='register_form'>
                    <div className={(errors.username) ? 'input-error' : 'input'}>
                        <label>Username</label>
                        <input onChange={() => setErrors({...errors, username: false})} name='username'/>
                    </div>
                    
                    <div className={'input'}>
                        <label>Password</label>
                        <input type='password' name='password'/>
                    </div>

                    <div className={(errors.password) ? 'input-error' : 'input'}>
                        <label>Repeat Password</label>
                        <input type='password' onChange={() => setErrors({...errors, password: false})} name='re_password'/>
                    </div>

                    <div className={(errors.pfp) ? 'input-error' : 'input'}>
                        <label>Profile picture link</label>
                        <input onChange={() => setErrors({...errors, pfp: false})} name='pfp'/>
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
