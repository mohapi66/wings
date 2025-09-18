import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Reporting from './components/Reporting';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [inventoryStatus, setInventoryStatus] = useState({});

  // Render backend base URL
  const RENDER_URL = 'https://wings-y3ae.onrender.com';

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    fetchProducts().then(setProducts).catch(console.error);
    fetchRecentSales().then(setSales).catch(console.error);
    fetchInventoryStatus().then(setInventoryStatus).catch(console.error);
  };

  const fetchProducts = async () => {
    const response = await fetch(`${RENDER_URL}/api/products`);
    return response.json();
  };

  const fetchRecentSales = async () => {
    const response = await fetch(`${RENDER_URL}/api/sales/recent`);
    return response.json();
  };

  const fetchInventoryStatus = async () => {
    const response = await fetch(`${RENDER_URL}/api/inventory/status`);
    return response.json();
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  products={products}
                  sales={sales}
                  inventoryStatus={inventoryStatus}
                />
              }
            />
            <Route
              path="/products"
              element={<ProductManagement />}
            />
            <Route
              path="/sales"
              element={
                <Sales
                  onSale={loadAllData}
                  onUpdateSales={() =>
                    fetchRecentSales().then(setSales)
                  }
                />
              }
            />
            <Route
              path="/inventory"
              element={<Inventory inventoryStatus={inventoryStatus} />}
            />
            <Route
              path="/reports"
              element={<Reporting products={products} sales={sales} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
