import React, { useState } from 'react';

const BACKEND_URL = "https://wings-inventory-backend.onrender.com/api";

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  return imageUrl.startsWith('http') ? imageUrl : `${BACKEND_URL}${imageUrl}`;
};

const Sales = ({ products = [], onSale, onUpdateSales }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSale = async (e) => {
    e.preventDefault();
    
    if (!selectedProduct || quantity <= 0) {
      alert('Please select a product and enter a valid quantity');
      return;
    }
    
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;
    if (product.quantity < quantity) {
      alert('Insufficient stock available');
      return;
    }
    
    const totalAmount = product.price * quantity;
    
    try {
      const response = await fetch(`${BACKEND_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: selectedProduct, quantity, totalAmount }),
      });
      
      if (response.ok) {
        setSelectedProduct('');
        setQuantity(1);
        onSale();
        onUpdateSales();
        alert('Sale recorded successfully!');
      }
    } catch (error) {
      console.error('Error recording sale:', error);
    }
  };

  return (
    <div className="sales">
      <h1>Record Sales</h1>
      
      <div className="sale-form-section">
        <h2>New Sale</h2>
        <form onSubmit={handleSale} className="sale-form">
          <div className="form-group">
            <label>Product:</label>
            <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
              <option value="">Select a product</option>
              {products.map(product => (
                <option key={product.id} value={product.id} disabled={product.quantity === 0}>
                  {product.name} - M{product.price.toFixed(2)} (Stock: {product.quantity})
                </option>
              ))}
            </select>
          </div>
          
          {selectedProduct && (() => {
            const product = products.find(p => p.id === selectedProduct);
            if (!product) return null;
            return (
              <div className="selected-product">
                {product.imageUrl && (
                  <div className="product-image">
                    <img src={getImageUrl(product.imageUrl)} alt={product.name} />
                  </div>
                )}
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>Category: {product.category}</p>
                  <p>Available: {product.quantity}</p>
                </div>
              </div>
            );
          })()}
          
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max={selectedProduct ? products.find(p => p.id === selectedProduct)?.quantity || 1 : 1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
            />
          </div>
          
          {selectedProduct && (() => {
            const product = products.find(p => p.id === selectedProduct);
            if (!product) return null;
            return (
              <div className="sale-summary">
                <p>Total: M{(product.price * quantity).toFixed(2)}</p>
              </div>
            );
          })()}
          
          <button type="submit">Record Sale</button>
        </form>
      </div>
    </div>
  );
};

export default Sales;
