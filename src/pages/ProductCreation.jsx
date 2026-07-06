// src/pages/ProductCreation.jsx

import React, { useState } from 'react';
import { db } from '../firebase/config'; // Importamos la conexión a Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importamos la función para añadir documentos
import './ProductCreation.css'; // Estilos para el formulario de creación

function ProductCreation() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState(''); // Para mostrar mensajes al usuario

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validaciones básicas
    if (!name || !price || !description || !category || !image) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      setMessage("El precio debe ser un número positivo.");
      return;
    }

    setMessage("Creando producto...");

    try {
      // Creamos un objeto con los datos del nuevo producto
      const newProduct = {
        name,
        price: parseFloat(price), // Convertimos el precio a número
        description,
        category,
        image,
      };

      // Referencia a la colección 'productos'
      const productsCollectionRef = collection(db, 'productos');

      // Añadimos el nuevo documento a la colección
      await addDoc(productsCollectionRef, newProduct);

      setMessage("¡Producto creado con éxito!");
      // Limpiamos el formulario
      setName('cola');
      setPrice('');
      setDescription('');
      setCategory('');
      setImage('');

    } catch (err) {
      console.error("Error al crear el producto:", err);
      setMessage("Error al crear el producto. Intenta de nuevo.");
    }
  };

  return (
    <div className="product-creation-container">
      <h2 className="product-creation-title">Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="product-creation-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-btn">Crear Producto</button>
      </form>
      {message && <p className={`message ${message.includes('éxito') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default ProductCreation;