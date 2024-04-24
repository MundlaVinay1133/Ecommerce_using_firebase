import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {auth,fs} from '../Config/Config';
import {useHistory} from 'react-router-dom';

const Signup = () => {

  const history = useHistory();

  const[fullName,setFullName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const[errorMsg,setErrorMsg]=useState('');
  const[successMsg,setSuccessMsg]=useState('');

  const handleSignup=(e)=>{
    e.preventDefault();
    // console.log(fullName,email,password);
     auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
      console.log(credentials);
          fs.collection('users').doc(credentials.user.uid).set({
            FullName:fullName,
            Email:email, 
            Password:password
          }).then(()=>{
            setSuccessMsg('Signup successfull.You will now automatiocally redirected to Login page');
            setFullName('');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
              setSuccessMsg('');
              history.push("/login");
            },3000)
          }).catch(error=>setErrorMsg(error.message));
     }).catch((error)=>{
        setErrorMsg(error.message);
     })
  }

  return (
    <div className='container'>
       <br/>
       <br/>
       <h1>Sign up</h1>
       <hr/>
       {successMsg && <>
         <div className='success-msg'>{successMsg}
         <br/></div>
       </>}
       <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
        <label>Full Name</label>
        <input type='text' className='form-control' required
        onChange={(e)=>setFullName(e.target.value)} value={fullName}/>
        <br/>
        <label>Email</label>
        <input type='email' className='form-control' required
        onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <br/>
        <label>Password</label>
        <input type='password' className='form-control' required
        onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <br/>
        <div className='btn-box'>
            <span>Already have an account Login
                <Link to='login' className='link'>Here</Link>
            </span>
            <button type='submit' className='btn btn-success btn-md'>SIGN UP</button>
        </div>
       </form>
       {errorMsg && <>
         <div className='error-msg'>{errorMsg}
         <br/></div>
       </>}

    </div>
  )
}

export default Signup