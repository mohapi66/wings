// src/api.js
const BASE_URL = 'https://wings-y3ae.onrender.com/api'; // <-- Render backend URL

// Products
export const fetchProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createProduct = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to create product');
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to update product');
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete product');
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Sales
export const fetchSales = async () => {
  try {
    const res = await fetch(`${BASE_URL}/sales`);
    if (!res.ok) throw new Error('Failed to fetch sales');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchRecentSales = async () => {
  try {
    const res = await fetch(`${BASE_URL}/sales/recent`);
    if (!res.ok) throw new Error('Failed to fetch recent sales');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createSale = async (saleData) => {
  try {
    const res = await fetch(`${BASE_URL}/sales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleData),
    });
    if (!res.ok) throw new Error('Failed to create sale');
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Inventory
export const fetchInventoryStatus = async () => {
  try {
    const res = await fetch(`${BASE_URL}/inventory/status`);
    if (!res.ok) throw new Error('Failed to fetch inventory status');
    return await res.json();
  } catch (error) {
    console.error(error);
    return {};
  }
};
