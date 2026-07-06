// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'; 
import Cart from './pages/Cart';
// import ProductCreation from './pages/ProductCreation'; // Ya no lo necesitamos, usamos ProductManagementPage
import ProductManagementPage from './pages/ProductManagementPage'; // <--- Importamos la nueva página
import GestionCupones from './pages/GestionCupones';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        <Route path="productos" element={<ItemListContainer title="Todos los Productos" />} />
        
        <Route path="productos/:id" element={<ProductDetail />} />
        
        <Route path="carrito" element={<Cart />} />

        {/* <--- ¡NUEVAS RUTAS Y CAMBIOS! */}
        {/* La gestión de productos ahora incluye creación, edición y eliminación */}
        <Route path="admin/productos" element={<ProductManagementPage />} /> 
        <Route path="admin/cupones" element={<GestionCupones />} />
        {/* <--- FIN DE CAMBIOS */}

        <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>404 - Página No Encontrada</h2>} />
      </Route>
    </Routes>
  );
}

export default App;