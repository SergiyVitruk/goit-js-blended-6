//Логіка сторінки Home
import { categoriesRender, productRender } from './js/render-function.js';
import { categoriesList } from './js/refs.js';
import { handleClickCategory } from './js/handlers.js';
import { getProducts } from './js/products-api.js';

categoriesRender();
getProducts().then(productRender).catch(console.error);
categoriesList.addEventListener('click', handleClickCategory);
