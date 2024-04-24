import React, { useState } from 'react'
import { Link ,useHistory} from 'react-router-dom/cjs/react-router-dom.min'
import {auth} from '../Config/Config';

const Login = () => {

  const history=useHistory();

  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
   

  const[errorMsg,setErrorMsg]=useState('');
  const[successMsg,setSuccessMsg]=useState('');

  const handlesubmit=(e)=>{
    e.preventDefault();
    // console.log(fullName,email,password);
     auth.signInWithEmailAndPassword(email,password).then(()=>{
           setSuccessMsg('Login Successfull.You automatically redirected to the Home page')
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
              setSuccessMsg('');
              history.push("/");
            },3000)
          }).catch(error=>setErrorMsg(error.message));
  }

  return (
    <div className='container'>
       <br/>
       <br/>
       <h1>Login</h1>
       <hr/>
       {successMsg && <>
         <div className='success-msg'>{successMsg}
         <br/></div>
       </>}
       <form className='form-group' autoComplete='off' onSubmit={handlesubmit}>
        <label>Email</label>
        <input type='email' className='form-control' required
         onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <br/>
        <label>Password</label>
        <input type='password' className='form-control' required
        onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <br/>
        <div className='btn-box'>
            <span>Don't have an account Signup
                <Link to='Signup' className='link'>Here</Link>
            </span>
            <button type='submit' className='btn btn-success btn-md'>Login</button>
        </div>
       </form>
       {errorMsg && <>
         <div className='error-msg'>{errorMsg}
         <br/></div>
       </>}

    </div>
  )
}

export default Login