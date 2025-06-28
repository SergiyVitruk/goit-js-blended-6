import axios from 'axios';

// Функції для роботи з бекендом
const BASE_URL = 'https://dummyjson.com';
const endPointCategoriesList = '/products/category-list';
const endPointProducts = '/products';
const currentPage = 2;

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
