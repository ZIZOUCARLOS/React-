// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <--- NUEVA: Importamos getAuth para autenticación

const firebaseConfig = {
  apiKey: "AIzaSyAD6JpqLj1dsJzd45CW2tGEndaEkm1pbZU",
  authDomain: "my-ecommerce-talento.firebaseapp.com",
  projectId: "my-ecommerce-talento",
  storageBucket: "my-ecommerce-talento.firebasestorage.app",
  messagingSenderId: "742090749679",
  appId: "1:742090749679:web:5a38c9ce5ecf3985dd0d1a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // <--- NUEVA: Exportamos la instancia de autenticación