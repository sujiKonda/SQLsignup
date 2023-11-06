import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from './DashBoard';
import LogIn from './LogIn';
import Signup from './Signup';
import Forgot from './Forgot';

function NavigateRoutes() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<LogIn/>}/>
            <Route path="/signup" exact element={<Signup/>}/>
            <Route path="/forgot" exact element={<Forgot/>}/>
            <Route path="/dashboard" exact element={<DashBoard/>}/>
        </Routes>
        </BrowserRouter>      
    </div>
  )
}

export default NavigateRoutes
