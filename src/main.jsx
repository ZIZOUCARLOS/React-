// src/main.jsx

import React from 'react'; // Necesario para JSX
import ReactDOM from 'react-dom/client'; // Para renderizar la aplicación en el DOM
import { BrowserRouter } from 'react-router-dom'; // <--- Importamos BrowserRouter para el ruteo (Clase 7)
import { CartProvider } from './context/CartContext'; // <--- Importamos CartProvider para el estado global del carrito (Clase 8)
import { HelmetProvider } from 'react-helmet-async'; // <--- NUEVA: Para React Helmet (Clase 13 - SEO)
import App from './App.jsx'; // Nuestro componente principal
import './index.css'; // Nuestros estilos globales
import 'bootstrap/dist/css/bootstrap.min.css'; // <--- NUEVA: Importación de Bootstrap CSS (Clase 13 - Estilización)

// Creamos la raíz de nuestra aplicación React en el elemento con id 'root' de index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        {/* HelmetProvider: Envuelve toda la aplicación para que React Helmet funcione globalmente */}
        <HelmetProvider> {/* <--- NUEVO: Proveedor para React Helmet */}
          <App />
        </HelmetProvider> {/* <--- CIERRE DE HelmetProvider */}
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);