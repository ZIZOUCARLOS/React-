// src/components/Header/Header.jsx

import React from 'react';
import { NavLink, Link } from 'react-router-dom'; // Usamos NavLink en lugar de Link para la navegación
import CartWidget from '../CartWidget/CartWidget'; 
import './Header.css'; // Si Header.jsx está en src/components/Header/, entonces el CSS está en la misma carpeta

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="app-logo">
        <h1>Mi tienda Online</h1>
      </Link>
      <nav className="app-nav"> {/* Añadí className="app-nav" aquí para el CSS del Header */}
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'app-header-nav-link active-link' : 'app-header-nav-link')}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/productos" 
              className={({ isActive }) => (isActive ? 'app-header-nav-link active-link' : 'app-header-nav-link')}
            >
              Productos
            </NavLink>
          </li>
          {/* <--- ¡NUEVOS ENLACES DE GESTIÓN! */}
          <li>
            <NavLink 
              to="/admin/productos" // <--- Este es el nuevo enlace para la gestión de productos
              className={({ isActive }) => (isActive ? 'app-header-nav-link active-link' : 'app-header-nav-link')}
            >
              Gestion Productos
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/cupones" 
              className={({ isActive }) => (isActive ? 'app-header-nav-link active-link' : 'app-header-nav-link')}
            >
              Gestion Cupones
            </NavLink>
          </li>
        </ul>
      </nav>
      <CartWidget />
    </header>
  );
}

export default Header;