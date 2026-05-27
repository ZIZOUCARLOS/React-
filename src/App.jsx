// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'; 
import Cart from './pages/Cart';
function App() {
return (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      
      <Route path="productos" element={<ItemListContainer title="Todos los Productos" />} />
      
      <Route path="productos/:id" element={<ProductDetail />} />
      
      <Route path="carrito" element={<Cart />} />

      <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>404 - Página No Encontrada</h2>} />
    </Route>
  </Routes>
);
}

export default App;