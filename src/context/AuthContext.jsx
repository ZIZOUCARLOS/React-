// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config'; // Importamos la instancia de auth de nuestra configuración de Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, // Para observar cambios en el estado de autenticación
} from 'firebase/auth';
import { toast } from 'react-toastify'; // Para notificaciones

// 1. Creamos el Contexto de Autenticación
export const AuthContext = createContext();

// 2. Custom Hook para facilitar el consumo del Contexto
export function useAuth() {
  return useContext(AuthContext);
}

// 3. El Proveedor del Contexto de Autenticación
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Estado para el usuario actual
  const [loading, setLoading] = useState(true); // Estado para saber si la autenticación está inicializando

  // Observador del estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // Actualiza el usuario actual
      setLoading(false); // La autenticación ha terminado de inicializar
    });

    return unsubscribe; // Desuscribe el observador al desmontar el componente
  }, []);

  // Funciones de autenticación
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // Valor que se proporciona a los componentes hijos
  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Solo renderiza los hijos una vez que la autenticación ha cargado */}
    </AuthContext.Provider>
  );
}