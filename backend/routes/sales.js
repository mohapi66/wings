const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/database.json');

const readData = () => {
  try { return JSON.parse(fs.readFileSync(dataPath, 'utf8')); }
  catch { return { products: [], sales: [], inventory: [] }; }
};
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

router.post('/', (req, res) => {
  const { productId, quantity, totalAmount } = req.body;
  const data = readData();

  const product = data.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (product.quantity < quantity) return res.status(400).json({ error: 'Insufficient stock' });

  product.quantity -= parseInt(quantity);

  const newSale = {
    id: Date.now().toString(),
    productId,
    productName: product.name,
    quantity: parseInt(quantity),
    totalAmount: parseFloat(totalAmount),
    date: new Date().toISOString()
  };
  data.sales.push(newSale);
  writeData(data);
  res.status(201).json(newSale);
});

router.get('/', (req, res) => res.json(readData().sales));
router.get('/recent', (req, res) => {
  const recentSales = readData().sales
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
  res.json(recentSales);
});

module.exports = router;
