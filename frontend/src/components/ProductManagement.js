import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('description', formData.description);
    productData.append('category', formData.category);
    productData.append('price', formData.price);
    productData.append('quantity', formData.quantity);
    if (formData.image) productData.append('image', formData.image);
    if (editingProduct && editingProduct.imageUrl) {
      productData.append('currentImage', editingProduct.imageUrl);
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      setFormData({ name: '', description: '', category: '', price: '', quantity: '', image: null });
      setImagePreview(null);
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      image: null
    });
    setImagePreview(product.imageUrl || null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', category: '', price: '', quantity: '', image: null });
    setImagePreview(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="product-management">
      <h1>Product Management</h1>
      
      <div className="form-section">
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Price (M):</label>
            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Quantity:</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
          </div>

          <div className="form-group full-width">
            <label>Product Image:</label>
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <div className="image-preview"><img src={imagePreview} alt="Preview" /></div>}
          </div>

          <div className="form-actions">
            <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
            {editingProduct && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="products-list">
        <h2>Current Products</h2>
        {products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                {product.imageUrl && (
                  <div className="product-image"><img src={product.imageUrl} alt={product.name} /></div>
                )}
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">M{product.price.toFixed(2)}</p>
                  <p className={`product-quantity ${product.quantity < 10 ? 'low-stock' : ''}`}>
                    Stock: {product.quantity}
                  </p>
                  <div className="product-actions">
                    <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
