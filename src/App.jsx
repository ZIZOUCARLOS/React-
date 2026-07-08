// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'; 
import Cart from './pages/Cart';
import ProductManagementPage from './pages/ProductManagementPage';
import GestionCupones from './pages/GestionCupones';

// <--- NUEVAS IMPORTACIONES PARA TOASTIFY
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// --- FIN NUEVAS IMPORTACIONES ---

function App() {
  return (
    <> {/* Usamos un React.Fragment para poder añadir ToastContainer */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          <Route path="productos" element={<ItemListContainer title="Todos los Productos" />} />
          
          <Route path="productos/:id" element={<ProductDetail />} />
          
          <Route path="carrito" element={<Cart />} />

          <Route path="admin/productos" element={<ProductManagementPage />} /> 
          <Route path="admin/cupones" element={<GestionCupones />} />

          <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>404 - Página No Encontrada</h2>} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> {/* <--- AÑADIMOS EL CONTENEDOR DE TOASTIFY */}
    </>
  );
}

export default App;