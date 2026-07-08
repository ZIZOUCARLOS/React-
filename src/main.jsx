// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // <--- NUEVA: Importamos AuthProvider
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de que este también esté para Toastify

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <HelmetProvider>
          <AuthProvider> {/* <--- ENVOLVEMOS LA APP CON AuthProvider */}
            <App />
          </AuthProvider> {/* <--- CIERRE DE AuthProvider */}
        </HelmetProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);