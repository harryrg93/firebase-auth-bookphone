import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Admin from './components/Admin';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Menu from './components/Menu';
import React from 'react';

function App() {
   return (
      <div className="App">
         <Router>
            <Menu />
            <Routes>
               <Route path="/" element={<Inicio />}></Route>
               <Route path="login" element={<Login />}></Route>
               <Route path="admin" element={<Admin />}></Route>
            </Routes>
         </Router>
      </div>
   );
}

export default App;
