//Логіка сторінки Home
import { renderCategories, renderProducts } from './js/render-function.js';
import { refs } from './js/refs.js';
import { getCategories, getProducts } from './js/products-api.js';
import {
  handleClickCategory,
  handleClickProduct,
  handleSearchSubmit,
  handleSearchInput,
  handleClearSearch,
} from './js/handlers.js';
import { showLoader, hideLoader } from './js/helpers.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
const limit = 12;

getCategories()
  .then(categories => {
    renderCategories(['All', ...categories]);
  })
  .catch(() => {
    iziToast.error({ message: 'Categories could not be loaded!' });
  });

async function loadProducts() {
  showLoader();
  await new Promise(r => setTimeout(r, 0)); // дозволити браузеру оновити UI
  try {
    const skip = (currentPage - 1) * limit;
    const products = await getProducts({ limit, skip });
    renderProducts(products);
  } catch (err) {
    iziToast.error({ message: 'Products could not be loaded!' });
  } finally {
    hideLoader();
  }
}

loadProducts();

refs.categoriesList.addEventListener('click', handleClickCategory);
refs.productsList.addEventListener('click', handleClickProduct);
refs.searchForm.addEventListener('submit', handleSearchSubmit);
refs.searchInput.addEventListener('input', handleSearchInput);
refs.clearSearchBtn.addEventListener('click', handleClearSearch);
