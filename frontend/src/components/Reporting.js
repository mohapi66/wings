import React from 'react';

const Reporting = ({ products, sales }) => {
  const totalSalesValue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalProductsValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  
  // Get sales by product
  const salesByProduct = {};
  sales.forEach(sale => {
    if (!salesByProduct[sale.productName]) {
      salesByProduct[sale.productName] = 0;
    }
    salesByProduct[sale.productName] += sale.quantity;
  });
  
  // Get top selling products
  const topSellingProducts = Object.entries(salesByProduct)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="reporting">
      <h1>Reports & Analytics</h1>
      
      <div className="report-stats">
        <div className="stat-card">
          <h3>Total Sales Value</h3>
          <p className="stat-number">M{totalSalesValue.toFixed(2)}</p>
        </div>
        
        <div className="stat-card">
          <h3>Inventory Value</h3>
          <p className="stat-number">M{totalProductsValue.toFixed(2)}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{products.length}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Transactions</h3>
          <p className="stat-number">{sales.length}</p>
        </div>
      </div>
      
      <div className="report-sections">
        <div className="report-section">
          <h2>Top Selling Products</h2>
          {topSellingProducts.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Units Sold</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map(([product, quantity]) => (
                  <tr key={product}>
                    <td>{product}</td>
                    <td>{quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No sales data available</p>
          )}
        </div>
        
        <div className="report-section">
          <h2>Recent Transactions</h2>
          {sales.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(0, 10).map(sale => (
                  <tr key={sale.id}>
                    <td>{new Date(sale.date).toLocaleDateString()}</td>
                    <td>{sale.productName}</td>
                    <td>{sale.quantity}</td>
                    <td>M{sale.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No sales data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reporting;