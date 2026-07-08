// src/pages/GestionCupones.jsx

import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import './GestionCupones.css';
import { toast } from 'react-toastify'; // <--- Importamos toast

function GestionCupones() {
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [codigo, setCodigo] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  // const [mensajeFormulario, setMensajeFormulario] = useState(''); // Ya no lo necesitamos

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
      toast.error("No se pudieron cargar los cupones."); // <--- Usamos toast
      setError("No se pudieron cargar los cupones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCupones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setMensajeFormulario(''); // Limpiamos el mensaje

    if (!codigo || !porcentaje || isNaN(porcentaje) || parseFloat(porcentaje) <= 0 || parseFloat(porcentaje) > 100) {
      toast.error("Por favor, introduce un código y un porcentaje válido (1-100)."); // <--- Usamos toast
      return;
    }

    try {
      const cuponesCollection = collection(db, 'cupones');
      await addDoc(cuponesCollection, {
        codigo: codigo.toUpperCase(),
        porcentaje: parseFloat(porcentaje)
      });
      toast.success("Cupón creado con éxito."); // <--- Usamos toast
      setCodigo('');
      setPorcentaje('');
      fetchCupones(); // Volvemos a cargar los cupones para actualizar la lista
    } catch (err) {
      console.error("Error al crear el cupón:", err);
      toast.error("Error al crear el cupón. Intenta de nuevo."); // <--- Usamos toast
    }
  };

  const handleDelete = async (id, codigoCupone) => {
    const confirmacion = window.confirm(`¿Está seguro de eliminar el cupón "${codigoCupone}"? Esta acción es irreversible.`);
    if (confirmacion) {
      try {
        const cuponDoc = doc(db, 'cupones', id);
        await deleteDoc(cuponDoc);
        toast.success(`Cupón "${codigoCupone}" eliminado con éxito.`); // <--- Usamos toast
        fetchCupones(); // Volvemos a cargar los cupones para actualizar la lista
      } catch (err) {
        console.error("Error al eliminar el cupón:", err);
        toast.error("Error al eliminar el cupón."); // <--- Usamos toast
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
        {/* Ya no necesitamos un mensaje local, Toastify lo maneja */}
        {/* {mensajeFormulario && <p className={`gestion-message ${mensajeFormulario.includes('éxito') ? 'success' : 'error'}`}>{mensajeFormulario}</p>} */}
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