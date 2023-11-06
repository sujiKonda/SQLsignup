import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { axiosPost,axiosGet,axiosPut } from './actions'
import {toast} from 'react-toastify'
import { userPayload } from '../ReduxStore';
import { useDispatch } from 'react-redux';
import { handlePayload } from '../App';
import 'react-toastify/dist/ReactToastify.css';
import "../index.css";

function LogIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const initialValues = {email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: name==='username'? value.replace(/\s+/g, ' ') :  value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const {email, password} = formValues;

    console.log('kkkkkkkkkkkk')
    let params = {
         path: 'login',
         query: `email=${email}&password=${password}`}
         axiosGet(params)
                .then(function (response) {
                  console.log('rrrrrrrrrrrrr',response?.data?.status)
                  if(response?.data?.status){
                    console.log('lllllllllllll');
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
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[^\s]{4,10}$/;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    } else if(!passwordValid.test(values.password)){
      errors.password = "Password format ex: Password@1";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button type="Submit" className="fluid ui button blue">Submit</button>
         {isSubmit && error &&  <button style={{marginLeft:"150px"}} onClick={()=> navigate('/forgot')}>forgot password ?</button>}
        </div>
      </form>
      <button style={{color:"black", border:'none', margin:'10px'}}  onClick={()=> navigate('/signup')}>Don't have account sign up here.</button>
    </div>
  );
}

export default LogIn;

