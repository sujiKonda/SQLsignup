import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosPut } from './actions'


function DashBoard() {
    const navigate = useNavigate();
    const userDta = useSelector((state)=> state?.userStore?.userData);

    const [passwordData, setPasswordData] = useState({oldPassword:'',newPassword:'', confirmPssword:""});

    const {oldPassword,newPassword,confirmPssword} = passwordData;

    const [chnagePassword, setChangePassword] = useState(false);

    const handleChnagePassword = (e)=>{
        e.preventDefault();
       if(newPassword!==confirmPssword){
        toast('New password and Confirm password are not same!',{position:'top-right',
        autoClose:5000,
        hideProgressBar:false,
        newestOnTop:false,
        closeOnClick:true,
        rtl:false});
       }else{

        let params = {
          path: 'user',
          body :{
              email:userDta?.email,
              password:newPassword,
              oldPassword:oldPassword
          }
      }
      axiosPut(params)
        .then(function (response) {
          console.log(response?.data?.data)
          if(response?.data?.status){
          setChangePassword(false);
          setPasswordData({oldPassword:'',newPassword:'', confirmPssword:""})
          toast.success(response?.data?.data, {position: toast.POSITION.TOP_RIGHT})
        }
          
        })
        .catch(function (error) {
          toast.error(error?.response?.data?.error, {position: toast.POSITION.TOP_RIGHT})
        })
       }
    }

    useEffect(()=>{
        if(Object.keys(userDta).length<=0){
            navigate('./')
        }
    }, [userDta])


  useEffect(()=>{
    if(Object.keys(userDta).length<=0){
      navigate('/')
    }
  }, [])

  return (
    <div>
       <h2>Mail and Password Settings</h2>
       <p>
        Registerd mail: {userDta?.email ? userDta.email : 'email is not there'}
       </p>
       {!chnagePassword && <button type="Button" onClick={()=>setChangePassword(true)}>Change Password</button>} 
       <br/>

       {chnagePassword && 
       <form onSubmit={(e)=>handleChnagePassword(e)}>
        <label htmlFor="oldpassword">Old Password:    </label>
        <input style={{margin:"20px"}} value={oldPassword} onChange={(e)=>setPasswordData({...passwordData,oldPassword:e.target.value})} type="password" id="oldpassword" name="oldpassword" required/>
        <br/>
        <label htmlFor="newpassword">New Password:    </label>
        <input minLength={6} style={{margin:"20px"}} value={newPassword} onChange={(e)=>setPasswordData({...passwordData,newPassword:e.target.value})} type="password" id="newpassword" name="newpassword" required/>
        <br/>
        <label htmlFor="confirmpassword">Confirm Password:   </label>
        <input  minLength={6} style={{margin:"20px"}} value={confirmPssword} onChange={(e)=>setPasswordData({...passwordData,confirmPssword:e.target.value})} type="password" id="confirmpassword" name="confirmpassword" required/>

        <br/>

        <button type="Submit" >Save</button>
        
        </form>} 
       <p>

       </p>

    </div>
  )
}

export default DashBoard
