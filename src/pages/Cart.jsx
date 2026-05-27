// src/pages/Cart.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
const { cart, clearCart, removeItem, getCartTotal } = useCart();

if (cart.length === 0) {
  return (
    <div className="cart-empty-container">
      <h2 className="cart-empty-title">🛒 Tu Carrito Está Vacío</h2>
      <p className="cart-empty-message">Parece que aún no has agregado ningún producto. ¡Explora nuestra tienda!</p>
      <Link to="/productos" className="cart-empty-link">Ir a Productos</Link>
    </div>
  );
}

return (
  <div className="cart-container">
    <h2 className="cart-title">Resumen de tu Carrito</h2>
    {cart.map(item => (
      <div key={item.id} className="cart-item">
        <div className="cart-item-info">
          {/*Ejemplo Carlos */}
          {/*Ejemplo Carlos */}
          <h3 className="cart-item-name">{item.name}</h3>
          <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
        </div>
        <div className="cart-item-actions">
          <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => removeItem(item.id)} className="cart-item-remove-btn">Eliminar</button>
        </div>
      </div>
    ))}
    <div className="cart-summary">
      <h3 className="cart-total">Total: ${getCartTotal().toFixed(2)}</h3>
      <div className="cart-actions-bottom">
        <button onClick={clearCart} className="cart-clear-btn">Vaciar Carrito</button>
        <Link to="/productos" className="cart-continue-shopping-link">Continuar Comprando</Link>
      </div>
    </div>
  </div>
);
}

export default Cart;