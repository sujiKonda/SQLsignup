import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosPut } from './actions'


function DashBoard() {
    const navigate = useNavigate();
    const userDta = useSelector((state)=> state?.userStore?.userData);

    const initialValues = { password: "", confirmpassword:"" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [submit, setSubmit] = useState(false);
    const [change, setChnage] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };

    const validate = (values) => {

      const errors = {};
  
      const passwordValid =  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[^\s]{4,10}$/;
  
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

    const handleSubmit = (e)=>{
      console.log('form submittedddddddddd')
        e.preventDefault();
        setFormErrors(validate(formValues));
        setSubmit(true);
    }

    useEffect(()=>{

      if (Object.keys(formErrors).length === 0 && submit) {

        const { password, confirmpassword } = formValues;
        let params = {
          path: 'user',
          body :{
              email:userDta?.email,
              password,
          }
      }
      axiosPut(params)
        .then(function (response) {
          console.log(response?.data?.data)
          if(response?.data?.status){
          setFormValues({password:'', confirmpassword:""})
          setChnage(false);
          toast.success(response?.data?.data, {position: toast.POSITION.TOP_RIGHT})
        }
          
        })
        .catch(function (error) {
          toast.error(error?.response?.data?.error, {position: toast.POSITION.TOP_RIGHT})
        })
      }else{
        console.log(Object.keys(formErrors).length === 0 && submit)
      }

    },[formErrors,submit])

    

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <h4>User name: {userDta?.username}</h4>
          <h4>Email: {userDta?.email} </h4>
          {change ? <><div className="field">
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
          <button type="Submit" className="fluid ui button blue">Submit</button></> 
          : <button type="button" onClick={()=>{setChnage(true)}}>change</button>}
          
        </div>
      </form>
    </div>
  )
}

export default DashBoard
