// src/components/ItemList.jsx

import React from 'react';
import Item from '../Item/Item';

function ItemList({ products }) {
return (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
    {products.length === 0 ? (
      <p style={{ color: '#bbb' }}>No hay productos para mostrar.</p>
    ) : (
      products.map(product => (
        <Item
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
          image={product.image}
        />
      ))
    )}
  </div>
);
}

export default ItemList;