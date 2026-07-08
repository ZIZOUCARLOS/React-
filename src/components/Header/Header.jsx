// src/components/Header/Header.jsx

import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget'; 
import './Header.css'; // Asegúrate de que esta ruta sea correcta para tu Header.css
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.info("Sesión cerrada correctamente.");
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión. Intenta de nuevo.");
    }
  };

  return (
    <header className="app-header">
      <Link to="/" className="app-logo">
        <h1>Mi tienda Online</h1>
      </Link>
      <nav className="app-nav"> {/* <--- ¡Asegúrate de que este className="app-nav" esté aquí! */}
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
          <li>
            <NavLink 
              to="/admin/productos" 
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
          
          {/* <--- ENLACES DE AUTENTICACIÓN / CERRAR SESIÓN */}
          {!currentUser ? (
            <>
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => (isActive ? 'app-header-nav-link active-link' : 'app-header-nav-link')}
                >
                  Iniciar Sesión
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/signup" 
                  className={({ isActive }) => (isActive ? 'app-header-nav-link active-link' : 'app-header-nav-link')}
                >
                  Registrarse
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="user-info">
                {currentUser.email}
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          {/* --- FIN ENLACES DE AUTENTICACIÓN / CERRAR SESIÓN --- */}
        </ul>
      </nav>
      <CartWidget />
    </header>
  );
}

export default Header;