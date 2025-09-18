const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/database.json');

const readData = () => {
  try { return JSON.parse(fs.readFileSync(dataPath, 'utf8')); }
  catch { return { products: [], sales: [], inventory: [] }; }
};

router.get('/status', (req, res) => {
  const data = readData();
  const lowStock = data.products.filter(p => p.quantity < 10);
  res.json({
    totalProducts: data.products.length,
    lowStockCount: lowStock.length,
    lowStockProducts: lowStock
  });
});

module.exports = router;
