import React from 'react';

const Dashboard = ({ products, sales, inventoryStatus }) => {
  const totalProducts = products.length;
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const lowStockCount = inventoryStatus.lowStockCount || 0;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{totalProducts}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p className="stat-number">M{totalSales.toFixed(2)}</p>
        </div>
        
        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <p className="stat-number">{lowStockCount}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Recent Sales</h2>
          {sales.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(sale => (
                  <tr key={sale.id}>
                    <td>{sale.productName}</td>
                    <td>{sale.quantity}</td>
                    <td>M{sale.totalAmount.toFixed(2)}</td>
                    <td>{new Date(sale.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No recent sales</p>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Current Stock</h2>
          {products.length > 0 ? (
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  {product.imageUrl && (
                    <div className="product-image">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                  )}
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">M{product.price.toFixed(2)}</p>
                    <p className={`product-quantity ${product.quantity < 10 ? 'low-stock' : ''}`}>
                      Stock: {product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products in inventory</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
