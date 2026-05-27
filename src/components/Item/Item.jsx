// src/components/Item.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // <--- ¡RUTA CORREGIDA! Subimos dos niveles
import './Item.css';

// Añadimos 'image' a las props que recibe el componente
function Item({ id, name, price, description, image }) {
const [quantity, setQuantity] = useState(1);
const { addToCart } = useCart();

const handleAddToCart = () => {
  // Aseguramos que el objeto productToAdd también incluya la imagen
  const productToAdd = { id, name, price, description, image };
  addToCart(productToAdd, quantity);
  alert(`Agregaste ${quantity}x ${name} al carrito.`);
  setQuantity(1);
};

return (
  <div className="item-card">
    <Link to={`/productos/${id}`} className="item-link">
      <img src={image} alt={name} className="item-image" />
      <h3 className="item-name">{name}</h3>
      <p className="item-description">{description}</p>
      <p className="item-price">${price.toFixed(2)}</p>
    </Link>

    <div className="item-quantity-controls">
      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="quantity-btn">-</button>
      <span className="item-quantity">{quantity}</span>
      <button onClick={() => setQuantity(quantity + 1)} className="quantity-btn">+</button>
    </div>
    <button onClick={handleAddToCart} className="add-to-cart-btn">Añadir al Carrito</button>
  </div>
);
}

export default Item;