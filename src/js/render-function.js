import { getCategoriesList, getProducts } from './products-api';
import { categoriesList, productsList } from './refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//Функцію для створення, рендеру або видалення розмітки
export function markupCategories(arr) {
  return arr
    .map(
      item =>
        `<li class="categories__item">
   <button class="categories__btn" type="button">${item}</button>
 </li>
`
    )
    .join('');
}

export async function categoriesRender() {
  try {
    const data = await getCategoriesList();
    const allCategoriesArr = ['All', ...data];
    categoriesList.insertAdjacentHTML(
      'beforeend',
      markupCategories(allCategoriesArr)
    );
  } catch (error) {
    console.error(error);
    iziToast.error({ message: 'Loading error' });
  }
}

export function markupProducts(arr) {
  return arr
    .map(
      ({ id, thumbnail, title, description, brand, category, price }) =>
        `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${description}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>
  `
    )
    .join('');
}

export function productRender(data) {
  productsList.innerHTML = '';
  productsList.insertAdjacentHTML('afterbegin', markupProducts(data));
}
