import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { axiosPost,axiosGet,axiosPut } from './actions'
import {toast} from 'react-toastify'
import "../index.css";

function Forgot() {
    const navigate = useNavigate();
  const initialValues = { otp: "", email: "", password: "" ,confirmpassword:''};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: name==='otp'? value.replace(/[^0-9]/g, '').substring(0, 6):  value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const {email, otp, password} = formValues;
      let params = {
        path: 'password',
        body :{
            email,
            password,
            otp:'12345'
        }
    }
    axiosPut(params)
      .then(function (response) {
        console.log(response?.data?.data)
        navigate('/')
        toast.success(response?.data?.data, {position: toast.POSITION.TOP_RIGHT})
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error, {position: toast.POSITION.TOP_RIGHT})
      })
    }
  }, [formErrors]);
  const validate = (values) => {

    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const otpvalid = /^[0-9]+$/;
    const passwordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[^\s]{4,10}$/;

    if (!values.otp || (values.otp && values.otp.length <= 2) || !otpvalid.test(values.otp)) {
      errors.otp = !values.otp ? "otp is required!" 
      : !otpvalid.test(values.otp) ? 'Please enter valid otp!':'otp must be more than two characters';
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
        <h1>Forgot password</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formValues.otp}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.otp}</p>
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
          <button type="submit" className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Forgot;
