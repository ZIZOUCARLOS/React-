// src/components/ItemListContainer/ItemListContainer.jsx

import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import { db } from '../../firebase/config';
import { collection, getDocs, query, limit, startAfter } from 'firebase/firestore'; // Añadimos query, limit, startAfter
import { Container, Row, Col, Form, Spinner, Button, Alert } from 'react-bootstrap'; // Añadimos Spinner, Button, Alert
import { Helmet } from 'react-helmet-async';
import { FaSearch } from 'react-icons/fa';

// Definimos cuántos productos cargar por página
const PRODUCTOS_POR_PAGINA = 6; // Puedes ajustar este número

function ItemListContainer({ title = "Nuestros Productos" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para la paginación
  const [loadingMore, setLoadingMore] = useState(false); // Para el spinner de "Cargar más"
  const [lastVisible, setLastVisible] = useState(null); // Último documento visible para la paginación
  const [hasMore, setHasMore] = useState(true); // Indica si hay más productos para cargar

  // Función para obtener los productos iniciales
  const fetchInitialProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const productsCollectionRef = collection(db, 'productos');
      // Consulta para los primeros PRODUCTOS_POR_PAGINA
      const q = query(productsCollectionRef, limit(PRODUCTOS_POR_PAGINA));
      const snapshot = await getDocs(q);

      const productsData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setProducts(productsData);

      // Guardamos el último documento visible para la siguiente paginación
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastDoc);
      // Verificamos si hay más productos (si cargamos menos de la cantidad por página, es que no hay más)
      setHasMore(snapshot.docs.length === PRODUCTOS_POR_PAGINA);

    } catch (err) {
      console.error("Error al cargar los productos de Firebase:", err);
      setError("No se pudieron cargar los productos de Firebase. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener más productos (siguientes páginas)
  const fetchMoreProducts = async () => {
    if (!hasMore || loadingMore) return; // Si no hay más o ya está cargando, no hacer nada

    setLoadingMore(true);
    try {
      const productsCollectionRef = collection(db, 'productos');
      // Consulta: empezar después del último documento visible, y limitar
      const q = query(productsCollectionRef, startAfter(lastVisible), limit(PRODUCTOS_POR_PAGINA));
      const snapshot = await getDocs(q);

      const newProductsData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setProducts(prevProducts => [...prevProducts, ...newProductsData]); // Añadimos los nuevos productos
      
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastDoc);
      setHasMore(snapshot.docs.length === PRODUCTOS_POR_PAGINA); // Si cargamos menos, no hay más

    } catch (err) {
      console.error("Error al cargar más productos de Firebase:", err);
      setError("Error al cargar más productos.");
    } finally {
      setLoadingMore(false);
    }
  };

  // Función para volver a la primera página (Ver menos)
  const showLessProducts = () => {
    fetchInitialProducts(); // Cargar solo los productos iniciales
    window.scrollTo(0, 0); // Opcional: desplazar la vista al inicio de la página
  };

  useEffect(() => {
    fetchInitialProducts();
  }, []); // Se ejecuta solo una vez al montar

  // Lógica de filtrado de productos (se aplica sobre los productos YA CARGADOS)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p style={{ textAlign: 'center', color: '#61dafb', fontSize: '1.2em' }}>Cargando productos...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', fontSize: '1.2em' }}>Error: {error}</p>;

  return (
    <Container className="mt-4">
      <Helmet>
        <title>{title} | Mi Tienda Online</title>
        <meta name="description" content="Descubre nuestra gran variedad de productos de alta calidad." />
        <meta name="keywords" content="productos, e-commerce, tienda online, comprar" />
      </Helmet>

      <h2 style={{ textAlign: 'center', color: '#61dafb', fontSize: '2em', marginBottom: '30px' }}>{title}</h2>
      
      {/* Barra de Búsqueda */}
      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form className="d-flex">
            <div className="input-group">
              <span className="input-group-text"><FaSearch /></span>
              <Form.Control
                type="text"
                placeholder="Buscar productos..."
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Form>
        </Col>
      </Row>

      {/* Listado de Productos */}
      <Row>
        {filteredProducts.length === 0 && !loading && !error ? (
          <Col xs={12} className="text-center">
            <p style={{ color: '#bbb', fontSize: '1.2em' }}>No se encontraron productos que coincidan con la búsqueda.</p>
          </Col>
        ) : (
          filteredProducts.map(product => (
            <Col key={product.id} xs={12} md={6} lg={4} className="mb-4 d-flex">
              <Item
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image}
              />
            </Col>
          ))
        )}
      </Row>

      {/* Controles de Paginación */}
      <Row className="my-4 justify-content-center">
        <Col className="text-center d-flex justify-content-center gap-2">
          {/* Botón "Ver menos" solo si hay más productos que los iniciales */}
          {products.length > PRODUCTOS_POR_PAGINA && (
            <Button variant="secondary" onClick={showLessProducts}>
              Ver menos
            </Button>
          )}

          {/* Botón "Cargar más" */}
          {hasMore && (
            <Button onClick={fetchMoreProducts} disabled={loadingMore} variant="primary">
              {loadingMore ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="visually-hidden">Cargando...</span>
                </>
              ) : (
                'Cargar más'
              )}
            </Button>
          )}

          {!hasMore && products.length > 0 && products.length <= PRODUCTOS_POR_PAGINA && (
            <Alert variant="light" className="m-0">No hay más productos para mostrar.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ItemListContainer;