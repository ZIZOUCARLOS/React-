// // src/components/ItemListContainer/ItemListContainer.jsx

// import React, { useEffect, useState } from 'react';
// import ItemList from '../ItemList/ItemList';

// function ItemListContainer({ title = "Nuestros Productos" }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null); 

//     fetch('/data/productos.json') 
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Error al cargar los productos. Código: ' + response.status);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setProducts(data);
//       })
//       .catch(err => {
//         console.error("Hubo un error al obtener los productos:", err);
//         setError("No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde."); // Guardamos el error
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez al montar

//   // Renderizado condicional basado en los estados de loading y error
//   if (loading) return <p style={{ textAlign: 'center', color: '#61dafb', fontSize: '1.2em', marginTop: '50px' }}>Cargando productos...</p>;
//   if (error) return <p style={{ textAlign: 'center', color: 'red', fontSize: '1.2em', marginTop: '50px' }}>Error: {error}</p>;

//   return (
//     <section style={{ padding: '20px 0' }}>
//       <h2 style={{ textAlign: 'center', color: '#61dafb', fontSize: '2em', marginBottom: '30px' }}>{title}</h2>
//       <ItemList products={products} /> {/* Pasamos los productos a ItemList para que los muestre */}
//     </section>
//   );
// }

// export default ItemListContainer;
// // //src/components/ItemListContainer.jsx

// src/components/ItemListContainer/ItemListContainer.jsx

import React, { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList'; // Ruta relativa a la carpeta ItemList
import { db } from '../../firebase/config'; // <--- Importamos nuestra instancia de la base de datos de Firebase
import { collection, getDocs } from 'firebase/firestore'; // <--- Importamos las funciones necesarias de Firestore

function ItemListContainer({ title = "Nuestros Productos" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); // Iniciamos el estado de carga
    setError(null); // Limpiamos cualquier error previo

    // 1. Creamos una referencia a la colección de productos en Firestore
    // ¡IMPORTANTE! Asegúrate de que 'productos' coincida exactamente con el nombre de tu colección en la consola de Firebase.
    // Según tu screenshot, tu colección se llama 'productos' (en minúsculas).
    const productsCollectionRef = collection(db, 'productos'); 

    // 2. Obtenemos los documentos de esa colección de forma asíncrona
    getDocs(productsCollectionRef)
      .then(snapshot => { // 'snapshot' contiene la respuesta de Firestore
        // 3. Procesamos los datos:
        // 'snapshot.docs' es un array de documentos de Firestore.
        // Mapeamos cada documento para extraer sus datos y el ID que Firebase le asigna.
        const productsFromFirestore = snapshot.docs.map(doc => ({
          ...doc.data(), // doc.data() devuelve los campos del documento (name, price, etc.)
          id: doc.id     // doc.id devuelve el ID único generado por Firebase para este documento
        }));
        setProducts(productsFromFirestore); // Actualizamos el estado con los productos de Firebase
      })
      .catch(err => {
        console.error("Error al cargar los productos de Firebase:", err);
        setError("No se pudieron cargar los productos de Firebase. Por favor, intenta de nuevo.");
      })
      .finally(() => {
        setLoading(false); // Finalizamos el estado de carga, haya éxito o error
      });
  }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez al montar

  if (loading) return <p style={{ textAlign: 'center', color: '#61dafb', fontSize: '1.2em' }}>Cargando productos...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', fontSize: '1.2em' }}>Error: {error}</p>;

  return (
    <section style={{ padding: '20px 0' }}>
      <h2 style={{ textAlign: 'center', color: '#61dafb', fontSize: '2em', marginBottom: '30px' }}>{title}</h2>
      <ItemList products={products} /> {/* Pasamos los productos a ItemList para que los muestre */}
    </section>
  );
}

export default ItemListContainer;