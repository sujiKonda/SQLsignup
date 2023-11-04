import React, { useState} from 'react'
import '../App.css'
import { axiosPost,axiosGet,axiosPut } from './actions'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { handlePayload } from '../App';
import { userPayload } from '../ReduxStore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function SignupLogIn() {
    const [email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    const [passwordData, setPasswordData] = useState({otp:'', confirmPssword:""});

    const {otp,confirmPassword} = passwordData;
    const [forgot, setForgot] = useState(false);

    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () =>{
        let params = {
            path: 'login',
            query: `email=${email}&password=${password}`
        }
        axiosGet(params)
          .then(function (response) {
            if(response?.data?.status){
                localStorage.clear()
                localStorage.setItem('token', response?.data?.data)
                handlePayload().then((res=> res?.status && dispatch(userPayload(res?.data)))).catch(e=>console.log("e.....:)", e))
                navigate('/dashboard')
            }
          })
          .catch(function (error) {
            toast.error(error?.response?.data?.error, {position: toast.POSITION.TOP_RIGHT})
            setError(true);

          })
    }

    const handleSignup = () =>{
        let params = {
            path: 'signup',
            body :{
                email,
                password
            }
        }
        axiosPost(params)
          .then(function (response) {
            console.log(response?.data?.data)
            toast.success(response?.data?.data, {position: toast.POSITION.TOP_RIGHT})
          })
          .catch(function (error) {
            toast.error(error?.response?.data?.error, {position: toast.POSITION.TOP_RIGHT})
          })
    }

    const handleReset = () =>{
      let params = {
          path: 'password',
          body :{
              email,
              password,
              confirmPassword,
              otp
          }
      }
      axiosPut(params)
        .then(function (response) {
          console.log(response?.data?.data)
          setForgot(false);
          setError(false);
          setEmail('');
          setPassword('');
          setPasswordData({otp:'', confirmPssword:""})
          toast.success(response?.data?.data, {position: toast.POSITION.TOP_RIGHT})
        })
        .catch(function (error) {
          toast.error(error?.response?.data?.error, {position: toast.POSITION.TOP_RIGHT})
        })
  }

  return (
    <div className='App-header'>
        <input type="email" name='email' value={email} 
        onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
        <br/>
        {forgot &&  <> <input type='number' maxLength={6} minLength={6} name='otp' value={otp} 
        onChange={(e)=>setPasswordData({...passwordData,otp:e.target.value})} placeholder="Enter OTP"/>
          <br/></>}
       
        <input type='password' minLength={6} name='password' value={password} 
        onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
          <br/>

          {forgot &&  <> <input minLength={6} type='password' name='confirmPassword' value={confirmPassword} 
        onChange={(e)=>setPasswordData({...passwordData,confirmPassword:e.target.value})} placeholder="Confirm Password"/>
          <br/></>}
        {error && !forgot && <button type='button' onClick={()=>{setError(false);setForgot(true);setPassword('')}} style={{fontSize:"15px", border:'none', background:"transparent", color:"blue"}}>forgot password ?</button>}
        <br/><br/>

        {forgot &&   <button onClick={handleReset}>Verify & Change</button> }
      
     {!forgot && <><button onClick={handleLogin}>Login</button><br/></>}
     {!forgot && <button onClick={handleSignup}>Signup</button> } 
    </div>
  )
}

export default SignupLogIn
