// src/main.jsx

import React from 'react'; // Necesario para JSX
import ReactDOM from 'react-dom/client'; // Para renderizar la aplicación en el DOM
import { BrowserRouter } from 'react-router-dom'; // <--- Importamos BrowserRouter para el ruteo (Clase 7)
import { CartProvider } from './context/CartContext'; // <--- Importamos CartProvider para el estado global del carrito (Clase 8)
import App from './App.jsx'; // Nuestro componente principal
import './index.css'; // Nuestros estilos globales

// Creamos la raíz de nuestra aplicación React en el elemento con id 'root' de index.html
ReactDOM.createRoot(document.getElementById('root')).render(
// React.StrictMode es una herramienta para destacar problemas potenciales en la aplicación.
// No renderiza UI visible, pero activa comprobaciones y advertencias adicionales.
<React.StrictMode>
  {/* BrowserRouter: Habilita el ruteo de la aplicación. */}
  <BrowserRouter>
    {/* CartProvider: Envuelve toda la aplicación para que el estado del carrito sea accesible globalmente. */}
    {/* Por ahora CartProvider no tendrá lógica, pero lo preparamos. */}
    <CartProvider>
      {/* App: Nuestro componente principal donde definiremos la estructura y las rutas. */}
      <App />
    </CartProvider>
  </BrowserRouter>
</React.StrictMode>,
);