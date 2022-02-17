import React, { useEffect, useState } from 'react';
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDoc,
   getDocs,
   updateDoc
} from 'firebase/firestore';

import { firedb } from '../firebase.config';

const Inicio = () => {
   const [nombre, setNombre] = useState('');
   const [phone, setPhone] = useState('');
   const [personas, setPersonas] = useState([]);
   const [error, setError] = useState('');
   const [updateMode, setUpdateMode] = useState(false);
   const [id, setId] = useState('');

   const getAgenda = async () => {
      const { docs } = await getDocs(collection(firedb, 'agenda'));
      const arr = docs.map((item) => ({ id: item.id, ...item.data() }));
      setPersonas(arr);
   };

   const validar = () => {
      if (!nombre.trim() || !phone.trim()) {
         setError('Todos los campos son requeridos');
         return true;
      }
      setError('');
   };

   const setUsuarios = async (e) => {
      e.preventDefault();

      if (validar()) return;
      const person = {
         name: nombre,
         phone: phone
      };
      try {
         const data = await addDoc(collection(firedb, 'agenda'), person);
         console.log('user add success: ', data);
         getAgenda();
      } catch (e) {
         console.error('Error adding document: ', e);
         setError('Missing or insufficient permissions. Need Login');
      }
      setNombre('');
      setPhone('');
   };

   const deletePerson = async (id) => {
      try {
         await deleteDoc(doc(firedb, 'agenda', id));
         console.log('Delete success', id);
      } catch (e) {
         console.log(e);
      }
      getAgenda();
   };

   const updateState = async (e) => {
      const refDoc = await doc(firedb, 'agenda', e.id);
      const person = await getDoc(refDoc);
      const data = person.data();
      setUpdateMode(true);
      setNombre(data.name);
      setPhone(data.phone);
      setId(person.id);
   };

   const updatePerson = async (e) => {
      e.preventDefault();
      if (validar()) return;

      const refDoc = await doc(firedb, 'agenda', id);
      const person = {
         name: nombre,
         phone: phone
      };
      try {
         await updateDoc(refDoc, person);
         console.log('update success');
      } catch (e) {
         console.error('Error updating document: ', e);
         setError('Missing or insufficient permissions. Need Login');
      }
      getAgenda();
      setUpdateMode(false);
      setNombre('');
      setPhone('');
      setId('');
   };

   useEffect(() => {
      getAgenda();
   }, []);

   return (
      <div>
         <div className="container">
            <div className="row mt-5">
               <div className="col">
                  <h2>Contacts Form</h2>
                  <form
                     className="form-group"
                     onSubmit={updateMode ? updatePerson : setUsuarios}
                  >
                     <input
                        onChange={(e) => {
                           setNombre(e.target.value);
                        }}
                        className="form-control"
                        required
                        type="text"
                        placeholder="Name"
                        value={nombre}
                     />
                     <input
                        onChange={(e) => {
                           setPhone(e.target.value);
                        }}
                        className="form-control mt-3"
                        required
                        type="number"
                        placeholder="Number Phone"
                        value={phone}
                     />
                     <input
                        type="submit"
                        className="btn btn-dark w-100 mt-5 "
                        value={updateMode ? 'Save Changes' : 'Register'}
                     />
                  </form>
                  {error ? (
                     <div>
                        <p>{error}</p>
                     </div>
                  ) : (
                     <span></span>
                  )}
               </div>
               <div className="col">
                  <h2>Contacts List</h2>
                  <ul className="list-group">
                     {personas.length ? (
                        personas.map((item) => (
                           <li
                              key={item.id}
                              className="list-group-item list-group-item-primary"
                           >
                              {item.name} --- {item.phone}
                              <button
                                 className="bnt btn-secondary float-end"
                                 onClick={() => deletePerson(item.id)}
                              >
                                 Delete
                              </button>
                              <button
                                 className="bnt btn-white float-end"
                                 onClick={() => updateState(item)}
                              >
                                 Update
                              </button>
                           </li>
                        ))
                     ) : (
                        <span>No hay registros</span>
                     )}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Inicio;
