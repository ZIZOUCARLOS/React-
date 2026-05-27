// src/components/ItemListContainer/ItemListContainer.jsx

import React, { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';

function ItemListContainer({ title = "Nuestros Productos" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null); 

    fetch('/data/productos.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar los productos. Código: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.error("Hubo un error al obtener los productos:", err);
        setError("No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde."); // Guardamos el error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez al montar

  // Renderizado condicional basado en los estados de loading y error
  if (loading) return <p style={{ textAlign: 'center', color: '#61dafb', fontSize: '1.2em', marginTop: '50px' }}>Cargando productos...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', fontSize: '1.2em', marginTop: '50px' }}>Error: {error}</p>;

  return (
    <section style={{ padding: '20px 0' }}>
      <h2 style={{ textAlign: 'center', color: '#61dafb', fontSize: '2em', marginBottom: '30px' }}>{title}</h2>
      <ItemList products={products} /> {/* Pasamos los productos a ItemList para que los muestre */}
    </section>
  );
}

export default ItemListContainer;