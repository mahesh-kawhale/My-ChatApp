import React from 'react'
import { useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {

  const [error, setError] = useState(false);
  const navigate = useNavigate();   // to get Home Page from register

  const handleSubmit = async (e) => {
    e.preventDefault(); // to avoid refresh on submit

    const email = e.target[0].value;
    const password = e.target[1].value;
  

    try{

      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")


    }catch(error){
      setError(true)
    }
      
    
    
  };


  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <h3 className='logo'>My Chat</h3>
            <h3 className='title'>Login</h3>
            <form onSubmit={handleSubmit} className='formbox'>
                <input type="email"  placeholder='email'/>
                <input type="password"  placeholder='password'/>
                <button className='btn'>Sign In</button>
                {error && <span>Something went wrong</span>}

            </form>
            <p className='formtext'>You dont have an Accont? <Link to='/register'>Register</Link></p>
        </div>
      
    </div>
  )
}

export default Login

