// src/components/CartWidget/CartWidget.jsx

import React from 'react';
import './CartWidget.css'; // Importa su archivo CSS


function CartWidget() {
  return (
    <div className="cart-widget">
      🛒
      <span className="cart-count">0</span>
    </div>
  );
}

export default CartWidget;