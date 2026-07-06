// src/components/Header/Header.jsx

import React from 'react';
import { NavLink, Link } from 'react-router-dom'; // Usamos NavLink en lugar de Link para la navegación
import CartWidget from '../CartWidget/CartWidget'; 
import './Header.css'; // Si Header.jsx está en src/components/Header/, entonces el CSS está en la misma carpeta

function Header() {
  return (
    <header className="app-header">
      <h1>
        <Link to="/" className="app-header-title-link">Mi tienda Online</Link>
      </h1>
      <nav>
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
          {/* <--- ¡NUEVO ENLACE! */}
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