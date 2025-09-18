import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Wings Cafe Inventory System. All rights reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;