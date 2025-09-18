import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>Wings Cafe Inventory</h2>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/products" 
              className={location.pathname === '/products' ? 'nav-link active' : 'nav-link'}
            >
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/sales" 
              className={location.pathname === '/sales' ? 'nav-link active' : 'nav-link'}
            >
              Sales
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/inventory" 
              className={location.pathname === '/inventory' ? 'nav-link active' : 'nav-link'}
            >
              Inventory
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/reports" 
              className={location.pathname === '/reports' ? 'nav-link active' : 'nav-link'}
            >
              Reports
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;