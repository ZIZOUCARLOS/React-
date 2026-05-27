// src/pages/ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [quantity, setQuantity] = useState(1);

const { addToCart } = useCart();

useEffect(() => {
  setLoading(true);
  setError(null);
  fetch('/data/productos.json')
    .then(response => {
      if (!response.ok) throw new Error('Error al cargar los productos');
      return response.json();
    })
    .then(data => {
      const foundProduct = data.find(p => p.id === id);
      setProduct(foundProduct);
      if (!foundProduct) setError('Producto no encontrado.');
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, [id]);

const handleAddToCart = () => {
  if (product) {
    addToCart(product, quantity);
    alert(`Agregaste ${quantity}x ${product.name} al carrito.`);
    setQuantity(1);
  }
};

if (loading) return <p className="product-detail-status-message loading">Cargando detalles...</p>;
if (error) return <p className="product-detail-status-message error">Error: {error}</p>;
if (!product) return <p className="product-detail-status-message not-found">Producto no disponible.</p>;

return (
  <div className="product-detail-container">
    <h2 className="product-detail-title">{product.name}</h2>
    <p className="product-detail-description">{product.description}</p>
    <p className="product-detail-price">${product.price.toFixed(2)}</p>

    <div className="product-detail-quantity-controls">
      <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
      <span className="product-detail-quantity">{quantity}</span>
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
    </div>
    <button onClick={handleAddToCart} className="product-detail-add-to-cart-btn">
      Añadir al Carrito
    </button>
  </div>
);
}

export default ProductDetail;