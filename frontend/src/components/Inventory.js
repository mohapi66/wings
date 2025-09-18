import React from 'react';

const Inventory = ({ inventoryStatus }) => {
  return (
    <div className="inventory">
      <h1>Inventory Status</h1>
      
      <div className="inventory-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{inventoryStatus.totalProducts || 0}</p>
        </div>
        
        <div className="stat-card warning">
          <h3>Low Stock Items</h3>
          <p className="stat-number">{inventoryStatus.lowStockCount || 0}</p>
        </div>
      </div>
      
      <div className="low-stock-section">
        <h2>Low Stock Alert</h2>
        {inventoryStatus.lowStockProducts && inventoryStatus.lowStockProducts.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Current Stock</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {inventoryStatus.lowStockProducts.map(product => (
                <tr key={product.id} className="low-stock-row">
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No low stock items. All products are sufficiently stocked.</p>
        )}
      </div>
    </div>
  );
};

export default Inventory;