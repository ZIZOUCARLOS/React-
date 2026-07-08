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
import Signup from './pages/Signup'; // <--- Importamos el componente de registro
import Login from './pages/Login'; // <--- Importamos el componente de inicio de sesión

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          <Route path="productos" element={<ItemListContainer title="Todos los Productos" />} />
          
          <Route path="productos/:id" element={<ProductDetail />} />
          
          <Route path="carrito" element={<Cart />} />

          <Route path="admin/productos" element={<ProductManagementPage />} /> 
          <Route path="admin/cupones" element={<GestionCupones />} />

          {/* <--- NUEVAS RUTAS DE AUTENTICACIÓN */}
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          {/* --- FIN NUEVAS RUTAS --- */}

          <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>404 - Página No Encontrada</h2>} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default App;