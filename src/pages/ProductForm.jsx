// src/pages/ProductForm.jsx (Antes ProductCreation)

import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'; // Añadimos updateDoc y doc
import './ProductForm.css'; // Renombrado de ProductCreation.css

// Este componente ahora acepta un prop 'productToEdit' y una función 'onFormSubmit'
function ProductForm({ productToEdit, onFormSubmit, onCancelEdit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({}); // Nuevo estado para los errores de validación

  // useEffect para rellenar el formulario cuando se selecciona un producto para editar
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setPrice(productToEdit.price || ''); // Price puede ser number, lo dejamos así por ahora
      setDescription(productToEdit.description || '');
      setCategory(productToEdit.category || '');
      setImage(productToEdit.image || '');
      setMessage(''); // Limpiar mensajes al cambiar de producto
      setErrors({}); // Limpiar errores
    } else {
      // Si no hay producto para editar, limpiar el formulario
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setImage('');
      setMessage('');
      setErrors({});
    }
  }, [productToEdit]); // Este efecto se ejecuta cada vez que 'productToEdit' cambia

  // Función de validación
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre no puede estar vacío.";
    if (isNaN(price) || parseFloat(price) <= 0) newErrors.price = "El precio debe ser un número positivo.";
    if (!description.trim()) newErrors.description = "La descripción no puede estar vacía.";
    if (!category.trim()) newErrors.category = "La categoría no puede estar vacía.";
    if (!image.trim()) newErrors.image = "La URL de la imagen no puede estar vacía.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      setMessage("Por favor, corrige los errores del formulario.");
      return;
    }

    try {
      const productData = {
        name,
        price: parseFloat(price),
        description,
        category,
        image,
      };

      if (productToEdit) {
        // Modo edición: actualizar producto existente
        const docRef = doc(db, 'productos', productToEdit.id);
        await updateDoc(docRef, productData);
        setMessage("¡Producto actualizado con éxito!");
      } else {
        // Modo creación: añadir nuevo producto
        const productsCollectionRef = collection(db, 'productos');
        await addDoc(productsCollectionRef, productData);
        setMessage("¡Producto creado con éxito!");
        // Limpiamos el formulario solo después de crear
        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setImage('');
      }

      onFormSubmit(); // Notificar al componente padre que se ha enviado el formulario
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      setMessage("Error al guardar el producto. Intenta de nuevo.");
    }
  };

  return (
    <div className="product-form-container">
      <h2 className="product-form-title">{productToEdit ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" />
          {errors.price && <p className="error-text">{errors.price}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control"></textarea>
          {errors.description && <p className="error-text">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" />
          {errors.category && <p className="error-text">{errors.category}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen:</label>
          <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} className="form-control" />
          {errors.image && <p className="error-text">{errors.image}</p>}
        </div>
        <button type="submit" className="submit-btn">{productToEdit ? 'Actualizar Producto' : 'Crear Producto'}</button>
        {productToEdit && <button type="button" onClick={onCancelEdit} className="cancel-edit-btn">Cancelar Edición</button>}
      </form>
      {message && <p className={`message ${message.includes('éxito') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default ProductForm;