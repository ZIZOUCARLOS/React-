import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Card, Button } from 'react-bootstrap';
import './Item.css';
import { toast } from 'react-toastify'; // <--- Importación correcta de toast

function Item({ id, name, price, description, image }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const productToAdd = { id, name, price, description, image };
    addToCart(productToAdd, quantity);
    toast.success(`Agregaste ${quantity}x ${name} al carrito.`); // <--- ¡CAMBIO AQUÍ!
    setQuantity(1);
  };

  return (
    <Card className="h-100 item-custom-card">
      <Link to={`/productos/${id}`} className="item-link">
        {image && <Card.Img variant="top" src={image} className="item-card-image" />}
      </Link>
      
      <Card.Body className="d-flex flex-column item-card-body">
        <Link to={`/productos/${id}`} className="item-link">
          <Card.Title className="item-name">{name}</Card.Title>
          <Card.Text className="item-description">{description}</Card.Text>
          <Card.Text className="item-price mt-auto">${price.toFixed(2)}</Card.Text>
        </Link>
        
        <div className="item-quantity-controls">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => setQuantity(Math.max(1, quantity - 1))} 
            className="quantity-btn"
            aria-label={`Disminuir cantidad de ${name}`}
          >-</Button>
          <span className="item-quantity">{quantity}</span>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => setQuantity(quantity + 1)} 
            className="quantity-btn"
            aria-label={`Aumentar cantidad de ${name}`}
          >+</Button>
        </div>
        
        <Button 
          variant="success" 
          className="add-to-cart-btn" 
          onClick={handleAddToCart}
          aria-label={`Añadir ${name} al carrito`}
        >
          Añadir al Carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Item;