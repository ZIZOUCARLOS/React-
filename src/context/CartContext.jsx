import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();
export const useCart = () => {
const context = useContext(CartContext);
if (!context) {
  throw new Error('useCart debe ser usado dentro de un CartProvider');
}
return context;
};

export const CartProvider = ({ children }) => {
const [cart, setCart] = useState([]);


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

const removeItem = (id) => {
  const updatedCart = cart.filter(item => item.id !== id);
  setCart(updatedCart);
};

const clearCart = () => {
  setCart([]);
};

const getCartQuantity = () => {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};


const getCartTotal = () => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const contextValue = {
  cart,
  addToCart,
  removeItem,
  clearCart,
  getCartQuantity,
  getCartTotal,
};
return (
  <CartContext.Provider value={contextValue}>
    {children} {/* 'children' representa los componentes que envuelve CartProvider */}
  </CartContext.Provider>
);
};