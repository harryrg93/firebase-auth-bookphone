import React, { useState } from 'react';
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword
} from 'firebase/auth';

import { auth } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const [email, setEmail] = useState('');
   const [pass, setPass] = useState('');
   const [msgError, setMsgError] = useState(null);
   let navigate = useNavigate();

   const LoginUsuario = async (e) => {
      e.preventDefault();
      try {
         await signInWithEmailAndPassword(auth, email, pass);
         console.log('Login Success');
         setMsgError(null);
         navigate('/');
      } catch (e) {
         console.log(e.message);
         setMsgError('Email or Password Incorrect');
      }
   };

   const RegistrarUsuario = async (e) => {
      e.preventDefault();
      try {
         await createUserWithEmailAndPassword(auth, email, pass);
         console.log('Usuario Registrado');
         setMsgError(null);
         navigate('/');
      } catch (e) {
         console.log(e.message);
         if (e.code === 'auth/invalid-email') {
            console.log('error emails');
            setMsgError('Formato Email incorrecto');
         }
         if (e.code === 'auth/weak-password') {
            setMsgError('La password debe tener 6 caracters mas');
         }
      }
   };

   // useEffect(() => {
   //    onAuthStateChanged(auth, (usuario) => {
   //       if (usuario) {
   //          navigate('/');
   //       }
   //    });
   // }, []);

   return (
      <div className="row mt-5">
         <div className="col-2 col-md"></div>
         <div className="col">
            <form onSubmit={LoginUsuario} action="">
               <h1>Login</h1>
               <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mt-4"
                  type="email"
                  placeholder="Email"
                  required
               />
               <input
                  onChange={(e) => setPass(e.target.value)}
                  className="form-control mt-4"
                  type="password"
                  placeholder="contraseña"
                  minLength="6"
                  required
               />

               <button type="submit" className="btn btn-success w-100 mt-5">
                  Login User
               </button>
               <button
                  onClick={RegistrarUsuario}
                  className="btn btn-dark w-100 mt-1"
               >
                  Register User
               </button>
            </form>
            {msgError ? (
               <div className="alert alert-danger mt-3" role="alert">
                  {msgError}
               </div>
            ) : (
               <span />
            )}
         </div>
         <div className="col-2 col-md"></div>
      </div>
   );
};

export default Login;
