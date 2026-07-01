// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa getFirestore para acceder a la base de datos

// Tu configuración de Firebase para la aplicación web (tus credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyAD6JpqLj1dsJzd45CW2tGEndaEkm1pbZU",
  authDomain: "my-ecommerce-talento.firebaseapp.com",
  projectId: "my-ecommerce-talento",
  storageBucket: "my-ecommerce-talento.firebasestorage.app",
  messagingSenderId: "742090749679",
  appId: "1:742090749679:web:5a38c9ce5ecf3985dd0d1a"
};

// Inicializa Firebase en tu aplicación
const app = initializeApp(firebaseConfig);

// Obtiene una referencia al servicio de Firestore (la base de datos)
export const db = getFirestore(app);

