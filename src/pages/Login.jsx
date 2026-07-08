// src/pages/Login.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AuthForm.css'; // Usaremos el mismo CSS compartido

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await login(email, password);
      toast.success("¡Inicio de sesión exitoso!");
      navigate('/'); // Redirigimos al usuario a la página de inicio
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error("Correo electrónico o contraseña incorrectos.");
      } else {
        toast.error("Error al iniciar sesión. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
      <p className="auth-link-text">
        ¿No tienes una cuenta? <Link to="/signup" className="auth-link">Registrarse</Link>
      </p>
    </div>
  );
}

export default Login;