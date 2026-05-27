// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget'; 
import '../Header/Header.css';

function Header() {
return (
  <header className="app-header"> {}
    <h1>
      {}
      <Link to="/" className="app-header-title-link">Mi tienda Online</Link>
    </h1>
    <nav>
      <ul>
        {}
        <li><Link to="/" className="app-header-nav-link">Inicio</Link></li>
        <li><Link to="/productos" className="app-header-nav-link">Productos</Link></li>
      </ul>
    </nav>
    <CartWidget />
  </header>
);
}

export default Header;