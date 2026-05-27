// src/pages/Home.jsx

import React from 'react';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
function Home() {
return (
  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
    <h2 style={{ color: 'white', fontSize: '2.5em', marginBottom: '20px' }}>
      ¡Bienvenido a Tienda Damasco!
    </h2>
    <p style={{ color: '#bbb', fontSize: '1.1em', marginBottom: '40px' }}>
      Descubre nuestros productos más recientes y destacados.
    </p>
    <ItemListContainer title="Productos Destacados" />
  </div>
);
}

export default Home;