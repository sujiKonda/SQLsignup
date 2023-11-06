import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { axiosPost,axiosGet,axiosPut } from './actions'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "../index.css";

function Signup() {
    
    const navigate = useNavigate();
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: name==='username'? value.replace(/\s+/g, ' ').substring(0,15) :  value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const {username,email,password} = formValues;
    let params = {
        path: 'signup',
        body :{
            username,
            email,
            password
        }
    }
    axiosPost(params)
      .then(function (response) {
        console.log(response?.data?.data)
        toast.success(response?.data?.data, {position: toast.POSITION.TOP_RIGHT})
        navigate('/')
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error, {position: toast.POSITION.TOP_RIGHT})
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
    const usernamevalid = /^[a-zA-Z ]+$/;
    const passwordValid =  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[^\s]{4,10}$/;

    if (!values.username || (values.username && values.username.length <= 2) || !usernamevalid.test(values.username)) {
      errors.username = !values.username ? "Username is required!" 
      : !usernamevalid.test(values.username) ? 'Please enter valid username!':'Username must be more than two characters';
    }
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

    if (!values.confirmpassword) {
        errors.confirmpassword = "Confirm password is required";
      } else if (values.confirmpassword.length < 4) {
        errors.confirmpassword = "Confirm password must be more than 4 characters";
      } else if (values.confirmpassword.length > 10) {
        errors.confirmpassword = "Confirm password cannot exceed more than 10 characters";
      } else if(!passwordValid.test(values.confirmpassword)){
        errors.confirmpassword = "Confirm password format ex: Password@1";
      }else if (values.password !== values.confirmpassword){
        errors.confirmpassword = 'Confirm password and Confirm password Should match'
      }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Signup Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
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
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              value={formValues.confirmpassword}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.confirmpassword}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
      <button style={{color:"black", border:'none', margin:'10px'}} onClick={()=> navigate('/')}>Already have account.</button>
    </div>
  );
}

export default Signup;
