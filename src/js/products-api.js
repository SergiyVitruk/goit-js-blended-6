import axios from 'axios';

// Функції для роботи з бекендом
const BASE_URL = 'https://dummyjson.com';
const endPointCategoriesList = '/products/category-list';
const endPointProducts = '/products';
const endPointFilterByCategory = '/products/category/';
const currentPage = 1;

export async function getCategoriesList() {
  const response = await axios.get(`${BASE_URL}${endPointCategoriesList}`);
  return response.data;
}

export async function getProducts() {
  const response = await axios.get(
    `${BASE_URL}${endPointProducts}?limit=12&skip=${(currentPage - 1) * 12}`
  );
  return response.data.products;
}

export async function getProductsByCategories(category) {
  const response = await axios.get(
    `${BASE_URL}${endPointFilterByCategory}${category}`
  );
  return response.data.products;
}
