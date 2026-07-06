// src/pages/ProductManagementPage.jsx

import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm'; // Importamos el formulario renombrado
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Importamos deleteDoc
import './ProductManagementPage.css'; // Estilos para la gestión de productos

function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null); // Estado para el producto a editar

  // Función para cargar los productos desde Firebase
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const productsCollection = collection(db, 'productos');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    } catch (err) {
      console.error("Error al cargar los productos:", err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente y después de cada envío de formulario
  useEffect(() => {
    fetchProducts();
  }, []);

  // Manejar eliminación de producto
  const handleDelete = async (id, productName) => {
    const confirmacion = window.confirm(`¿Está seguro de eliminar el producto "${productName}"? Esta acción es irreversible.`);
    if (confirmacion) {
      try {
        const productDoc = doc(db, 'productos', id);
        await deleteDoc(productDoc);
        alert(`Producto "${productName}" eliminado con éxito.`);
        fetchProducts(); // Volvemos a cargar los productos para actualizar la lista
      } catch (err) {
        console.error("Error al eliminar el producto:", err);
        alert("Error al eliminar el producto.");
      }
    }
  };

  // Manejar clic en Editar
  const handleEditClick = (product) => {
    setProductToEdit(product); // Establecer el producto a editar
  };

  // Manejar cancelación de edición
  const handleCancelEdit = () => {
    setProductToEdit(null); // Limpiar el estado de edición
  };

  // Callback para cuando se envía el formulario (creación o edición)
  const handleFormSubmit = () => {
    setProductToEdit(null); // Limpiar estado de edición después de enviar
    fetchProducts(); // Refrescar la lista de productos
  };

  if (loading) return <p className="management-status">Cargando productos...</p>;
  if (error) return <p className="management-error">Error: {error}</p>;

  return (
    <div className="product-management-container">
      <h2 className="product-management-title">Gestión de Productos</h2>

      <ProductForm 
        productToEdit={productToEdit} 
        onFormSubmit={handleFormSubmit} 
        onCancelEdit={handleCancelEdit} 
      />

      <div className="product-list-section">
        <h3>Productos Existentes</h3>
        {products.length === 0 ? (
          <p className="management-status">No hay productos creados.</p>
        ) : (
          <ul className="products-management-list">
            {products.map(product => (
              <li key={product.id} className="product-management-item">
                <span>
                  <strong>{product.name}</strong> - ${product.price.toFixed(2)} ({product.category})
                </span>
                <div className="actions">
                  <button onClick={() => handleEditClick(product)} className="edit-btn">Editar</button>
                  <button onClick={() => handleDelete(product.id, product.name)} className="delete-btn">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProductManagementPage;