// src/components/Footer.jsx

import React from 'react';
import './Footer.css'; 

function Footer() {
  const equipo = [
    { id: '1', nombre: 'Alice', puesto: 'CEO', foto: '/images/avatar1.png' },
    { id: '2', nombre: 'Bob', puesto: 'Dev', foto: '/images/avatar2.png' },
    { id: '3', nombre: 'Charlie', puesto: 'Design', foto: '/images/avatar3.png' },
  ];

  return (
    <footer className="app-footer"> {/* Usamos la clase CSS */}
      <p className="company-info">© 2026 Tienda Damasco.</p>
      <h3 className="team-section">Nuestro Equipo</h3>
      <div className="team-cards">
        {equipo.map(persona => (
          <div key={persona.id} className="team-card">
            <img src={persona.foto} alt={persona.nombre} />
            <h4>{persona.nombre}</h4>
            <p>{persona.puesto}</p>
          </div>
        ))}
      </div>
      <p className="copyright-info">Desarrollado con ❤️ en React.</p>
    </footer>
  );
}

export default Footer;