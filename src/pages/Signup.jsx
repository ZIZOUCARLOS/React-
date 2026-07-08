// src/pages/Signup.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importamos nuestro custom hook para la autenticación
import { Link, useNavigate } from 'react-router-dom'; // Para navegar programáticamente
import { toast } from 'react-toastify'; // Para notificaciones
import './AuthForm.css'; // Usaremos un CSS compartido para formularios de autenticación

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Para deshabilitar el botón durante el registro
  const { signup } = useAuth(); // Obtenemos la función de registro del AuthContext
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true); // Deshabilitamos el botón
    try {
      await signup(email, password); // Llamamos a la función de registro
      toast.success("¡Registro exitoso! Ya puedes iniciar sesión.");
      navigate('/login'); // Redirigimos al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error al registrar:", error);
      // Firebase Auth errores comunes
      if (error.code === 'auth/email-already-in-use') {
        toast.error("El correo electrónico ya está registrado.");
      } else if (error.code === 'auth/weak-password') {
        toast.error("La contraseña debe tener al menos 6 caracteres.");
      } else {
        toast.error("Error al registrar. Intenta de nuevo.");
      }
    } finally {
      setLoading(false); // Habilitamos el botón de nuevo
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Registrarse</h2>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      <p className="auth-link-text">
        ¿Ya tienes una cuenta? <Link to="/login" className="auth-link">Iniciar sesión</Link>
      </p>
    </div>
  );
}

export default Signup;