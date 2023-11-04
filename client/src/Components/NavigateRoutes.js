import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from './DashBoard';
import SignupLogIn from './SignupLogIn';

function NavigateRoutes() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<SignupLogIn/>}/>
            <Route path="/dashboard" element={<DashBoard/>}/>
        </Routes>
        </BrowserRouter>      
    </div>
  )
}

export default NavigateRoutes
