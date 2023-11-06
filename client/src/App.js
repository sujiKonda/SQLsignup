import NavigateRoutes from './Components/NavigateRoutes'
import { ToastContainer } from 'react-toastify';
import React, {useEffect, createContext} from 'react'
import { axiosGet, gettoken } from './Components/actions';
import { useDispatch, useSelector } from 'react-redux';
import { userPayload } from './ReduxStore';

export const socketContext = createContext(null)

export const handlePayload = () => {
return new Promise((resolve)=>{
gettoken()
.then((res => res && axiosGet({path:"currentUser"})
.then(res => resolve(res))
.catch(e=> console.log(".....:)", e)) 
)).catch((e)=> console.log("....:)", e))
})
}

function App() {

  const dispatch = useDispatch();
  const userDta = useSelector((state)=> state?.userStore?.userData)

  useEffect(()=>{
  handlePayload().then((res=> res?.status && dispatch(userPayload(res?.data)))).catch(e=>console.log("e.....:)", e))
  }, []);

  
  return (
    <div>
<socketContext.Provider value ={{userDta}}>
       <NavigateRoutes/>
</socketContext.Provider>
     <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
     />
    </div>
  );
}

export default App;
