import React from "react";
import { ReactDOM, render } from "react-dom";
import App from './App'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const rootElement  = document.getElementById('app') ;
render(
    <Router>
         <Routes>
            <Route path="/" element={<App />} />
            <Route path="invoices" element={<App />} />
            <Route path="expenses" element={<App />} />
         </Routes>
    </Router>
,rootElement )