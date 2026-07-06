// src/pages/GestionCupones.jsx

import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Importamos deleteDoc
import './GestionCupones.css'; // Estilos para la gestión de cupones

function GestionCupones() {
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [codigo, setCodigo] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [mensajeFormulario, setMensajeFormulario] = useState('');

  // Función para cargar los cupones desde Firebase
  const fetchCupones = async () => {
    setLoading(true);
    setError(null);
    try {
      const cuponesCollection = collection(db, 'cupones');
      const cuponesSnapshot = await getDocs(cuponesCollection);
      const cuponesList = cuponesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCupones(cuponesList);
    } catch (err) {
      console.error("Error al cargar los cupones:", err);
      setError("No se pudieron cargar los cupones.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar cupones al montar el componente
  useEffect(() => {
    fetchCupones();
  }, []); // Se ejecuta solo una vez al montar

  // Manejar el envío del formulario para crear un cupón
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeFormulario('');

    if (!codigo || !porcentaje || isNaN(porcentaje) || parseFloat(porcentaje) <= 0 || parseFloat(porcentaje) > 100) {
      setMensajeFormulario("Por favor, introduce un código y un porcentaje válido (1-100).");
      return;
    }

    try {
      const cuponesCollection = collection(db, 'cupones');
      await addDoc(cuponesCollection, {
        codigo: codigo.toUpperCase(), // Guardamos el código en mayúsculas
        porcentaje: parseFloat(porcentaje)
      });
      setMensajeFormulario("Cupón creado con éxito.");
      setCodigo('');
      setPorcentaje('');
      fetchCupones(); // Volvemos a cargar los cupones para actualizar la lista
    } catch (err) {
      console.error("Error al crear el cupón:", err);
      setMensajeFormulario("Error al crear el cupón.");
    }
  };

  // Manejar la eliminación de un cupón
  const handleDelete = async (id, codigoCupone) => {
    const confirmacion = window.confirm(`¿Está seguro de eliminar el cupón "${codigoCupone}"? Esta acción es irreversible.`);
    if (confirmacion) {
      try {
        const cuponDoc = doc(db, 'cupones', id);
        await deleteDoc(cuponDoc);
        setMensajeFormulario(`Cupón "${codigoCupone}" eliminado con éxito.`);
        fetchCupones(); // Volvemos a cargar los cupones para actualizar la lista
      } catch (err) {
        console.error("Error al eliminar el cupón:", err);
        setMensajeFormulario("Error al eliminar el cupón.");
      }
    }
  };

  if (loading) return <p className="gestion-status">Cargando cupones...</p>;
  if (error) return <p className="gestion-error">Error: {error}</p>;

  return (
    <div className="gestion-cupones-container">
      <h2 className="gestion-cupones-title">Gestión de Cupones de Descuento</h2>

      <div className="gestion-form-section">
        <h3>Crear Nuevo Cupón</h3>
        <form onSubmit={handleSubmit} className="gestion-cupones-form">
          <div className="form-group">
            <label htmlFor="codigo">Código del Cupón:</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="porcentaje">Porcentaje de Descuento (%):</label>
            <input
              type="number"
              id="porcentaje"
              value={porcentaje}
              onChange={(e) => setPorcentaje(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="gestion-submit-btn">Crear Cupón</button>
        </form>
        {mensajeFormulario && <p className={`gestion-message ${mensajeFormulario.includes('éxito') ? 'success' : 'error'}`}>{mensajeFormulario}</p>}
      </div>

      <div className="gestion-list-section">
        <h3>Cupones Existentes</h3>
        {cupones.length === 0 ? (
          <p className="gestion-status">No hay cupones creados.</p>
        ) : (
          <ul className="cupones-list">
            {cupones.map(cupon => (
              <li key={cupon.id} className="cupon-item">
                <span><strong>Código:</strong> {cupon.codigo}</span>
                <span><strong>Descuento:</strong> {cupon.porcentaje}%</span>
                <button onClick={() => handleDelete(cupon.id, cupon.codigo)} className="gestion-delete-btn">Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GestionCupones;