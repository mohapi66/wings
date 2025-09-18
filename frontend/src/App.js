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

  useEffect(() => {
    fetchProducts();
    fetchRecentSales();
    fetchInventoryStatus();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchRecentSales = async () => {
    try {
      const response = await fetch('/api/sales/recent');
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const fetchInventoryStatus = async () => {
    try {
      const response = await fetch('/api/inventory/status');
      const data = await response.json();
      setInventoryStatus(data);
    } catch (error) {
      console.error('Error fetching inventory status:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <Dashboard 
                products={products} 
                sales={sales} 
                inventoryStatus={inventoryStatus} 
              />
            } />
            <Route path="/products" element={
              <ProductManagement 
                products={products} 
                onUpdate={fetchProducts} 
              />
            } />
            <Route path="/sales" element={
              <Sales 
                products={products} 
                onSale={fetchProducts} 
                onUpdateSales={fetchRecentSales} 
              />
            } />
            <Route path="/inventory" element={
              <Inventory 
                inventoryStatus={inventoryStatus} 
              />
            } />
            <Route path="/reports" element={
              <Reporting 
                products={products} 
                sales={sales} 
              />
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;