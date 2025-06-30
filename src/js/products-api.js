import axios from 'axios';

// Функції для роботи з бекендом

export async function getCategories() {
  const response = await axios.get(
    'https://dummyjson.com/products/category-list'
  );
  return response.data;
}

export async function getProducts({ limit = 12, skip = 0 }) {
  const response = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  return response.data.products;
}

export async function getProductsById(id) {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
}

export async function getProductsByCategory(category) {
  const response = await axios.get(
    `https://dummyjson.com/products/category/${category}`
  );
  return response.data.products;
}

export async function getProductsByQuery(query) {
  const response = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  return response.data.products;
}
