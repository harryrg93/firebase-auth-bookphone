import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { Link } from 'react-router-dom';
import { auth } from '../firebase.config';

const Menu = () => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      onAuthStateChanged(auth, (usuario) => {
         if (usuario) {
            setUser(usuario.email);
         }
      });
   }, []);

   const signOutSession = () => {
      signOut(auth);
      setUser(null);
   };

   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="container-fluid">
            <Link className="navbar-brand" to="/">
               <h5>Auth Firebase / Phonebook</h5>
            </Link>
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarSupportedContent"
               aria-controls="navbarSupportedContent"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon"></span>
            </button>
            <div
               className="collapse navbar-collapse"
               id="navbarSupportedContent"
            >
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                     <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/"
                     >
                        Home
                     </Link>
                  </li>
               </ul>

               {user ? (
                  <div className="d-flex flex-wrap">
                     <p className="text-white m-auto px-2">Hello, {user}</p>
                     <button
                        className="btn btn-success"
                        onClick={signOutSession}
                     >
                        Sing Out
                     </button>
                  </div>
               ) : (
                  <button className="btn btn-success">
                     <Link
                        to="login"
                        className="text-white text-decoration-none"
                        aria-current="page"
                     >
                        Login
                     </Link>
                  </button>
               )}
            </div>
         </div>
      </nav>
   );
};

export default Menu;
