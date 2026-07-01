// src/context/CartContext.jsx

import React, { createContext, useContext, useState } from 'react';

// 1. Creamos el Contexto
export const CartContext = createContext();

// 2. Custom Hook para facilitar el consumo del Contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// 3. El Proveedor del Contexto (CartProvider)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado principal del carrito

  // Función para agregar un producto al carrito
  const addToCart = (product, quantity) => {
    const itemInCart = cart.find(item => item.id === product.id);

    if (itemInCart) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity }]);
    }
  };

  // Función para eliminar un producto del carrito por su ID
  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  // Función para vaciar completamente el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Función para obtener la cantidad total de UNIDADES de productos en el carrito
  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Función para obtener el precio total de todos los productos en el carrito
  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // **NUEVA FUNCIÓN: Obtiene la cantidad actual de un producto específico en el carrito**
  const getCantidadActual = (productId) => {
    const item = cart.find(item => item.id === productId); // Busca el producto por ID
    return item ? item.quantity : 0; // Si lo encuentra, devuelve su cantidad; si no, 0.
  };

  // El 'value' es el objeto que contendrá todo lo que queremos compartir globalmente
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        clearCart,
        getCartQuantity,
        getCartTotal,
        getCantidadActual, // <-- ¡Asegúrate de que esta línea esté aquí!
      }}
    >
      {children}
    </CartContext.Provider>
  );
};