const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/database.json');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  cb(null, file.mimetype.startsWith('image/'));
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Helpers
const readData = () => {
  try { return JSON.parse(fs.readFileSync(dataPath, 'utf8')); }
  catch { return { products: [], sales: [], inventory: [] }; }
};
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// Routes
router.get('/', (req, res) => res.json(readData().products));

router.post('/', upload.single('image'), (req, res) => {
  const { name, description, category, price, quantity } = req.body;
  const data = readData();
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const newProduct = {
    id: Date.now().toString(),
    name, description, category,
    price: parseFloat(price),
    quantity: parseInt(quantity),
    imageUrl,
    createdAt: new Date().toISOString()
  };
  data.products.push(newProduct);
  writeData(data);
  res.status(201).json(newProduct);
});

router.put('/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, quantity, currentImage } = req.body;
  const data = readData();
  const productIndex = data.products.findIndex(p => p.id === id);
  if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });

  let imageUrl = currentImage || '';
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
    if (data.products[productIndex].imageUrl) {
      const oldImage = path.join(__dirname, '..', data.products[productIndex].imageUrl);
      if (fs.existsSync(oldImage)) fs.unlinkSync(oldImage);
    }
  }

  data.products[productIndex] = {
    ...data.products[productIndex],
    name, description, category,
    price: parseFloat(price),
    quantity: parseInt(quantity),
    imageUrl,
    updatedAt: new Date().toISOString()
  };
  writeData(data);
  res.json(data.products[productIndex]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const productIndex = data.products.findIndex(p => p.id === id);
  if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });
  if (data.products[productIndex].imageUrl) {
    const imgPath = path.join(__dirname, '..', data.products[productIndex].imageUrl);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
  data.products.splice(productIndex, 1);
  writeData(data);
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
