import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Asegúrate de que esta ruta sea correcta
import { db } from '../firebase/config'; // <--- Importamos la conexión a Firebase
import { doc, getDoc } from 'firebase/firestore'; // <--- Importamos funciones de Firebase
import './ProductDetail.css'; // Tu CSS existente

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Tu estado de cantidad

  const { addToCart } = useCart(); // Tu función addToCart

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProduct(null); // Reseteamos el producto antes de una nueva carga

    // Creamos una referencia al documento específico en Firestore (colección 'productos', ID 'id')
    const productRef = doc(db, 'productos', id);

    getDoc(productRef)
      .then(snapshot => {
        if (snapshot.exists()) { // Si el documento existe en Firebase
          setProduct({ ...snapshot.data(), id: snapshot.id });
        } else {
          setError("El producto no existe en nuestra base de datos."); // Producto no encontrado en Firebase
        }
      })
      .catch(err => {
        console.error("Error al cargar el detalle del producto desde Firebase:", err);
        setError("Hubo un error al obtener los detalles del producto.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]); // Este efecto se ejecuta cada vez que el 'id' de la URL cambia

  // Tu handleAddToCart existente
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`Agregaste ${quantity}x ${product.name} al carrito.`);
      setQuantity(1);
    }
  };

  // Tu renderizado existente (con tus clases CSS)
  if (loading) return <p className="product-detail-status-message loading">Cargando detalles...</p>;
  if (error) return <p className="product-detail-status-message error">Error: {error}</p>;
  if (!product) return <p className="product-detail-status-message not-found">Producto no disponible.</p>;

  return (
    <div className="product-detail-container">
      {/* Usamos tu class name */}
      <h2 className="product-detail-title">{product.name}</h2>
      {product.image && <img src={product.image} alt={product.name} className="product-detail-image" />}
      <p className="product-detail-description">{product.description}</p>
      <p className="product-detail-price">${product.price.toFixed(2)}</p>
      {/* Asegúrate de tener el product.category si quieres mostrarlo, si no, puedes quitar esta línea */}
      {product.category && <p className="product-detail-category">Categoría: {product.category}</p>}

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