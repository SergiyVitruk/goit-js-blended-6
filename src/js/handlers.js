import {
  getProducts,
  getProductsByCategory,
  getProductsById,
  getProductsByQuery,
} from './products-api.js';
import { renderProducts } from './render-function.js';
import { refs } from './refs.js';
import { renderModalContent, openModal } from './modal.js';
import iziToast from 'izitoast';

// Функції, які передаються колбеками в addEventListners
export async function handleClickCategory(event) {
  const clickedBtn = event.target.closest('.categories__btn');
  if (!clickedBtn) return;

  const category = clickedBtn.textContent.trim();
  const buttons = refs.categoriesList.querySelectorAll('.categories__btn');

  buttons.forEach(btn => btn.classList.remove('categories__btn--active'));
  clickedBtn.classList.add('categories__btn--active');

  refs.productsList.innerHTML = '';
  refs.notFound.classList.remove('not-found--visible');

  try {
    let products = [];

    if (category === 'All') {
      const res = await getProducts({ limit: 12, skip: 0 });
      products = res;
    } else {
      products = await getProductsByCategory(category);
    }

    if (products.length === 0) {
      refs.notFound.classList.add('not-found--visible');
    } else {
      renderProducts(products);
    }
  } catch (error) {
    iziToast.error({
      message: 'Error loading products. Try again later',
      position: 'topRight',
    });
  }
}

export async function handleClickProduct(event) {
  const li = event.target.closest('li.products__item');
  if (!li) return;

  const id = li.dataset.id;
  if (!id) return;

  try {
    const product = await getProductsById(id);
    renderModalContent(product);
    openModal();
  } catch (error) {
    iziToast.error({
      message: 'Unable to load product',
      position: 'topRight',
    });
  }
}

export async function handleSearchSubmit(event) {
  event.preventDefault();

  const query = refs.searchInput.value.trim();
  refs.productsList.innerHTML = '';
  refs.notFound.classList.remove('not-found--visible');

  if (query === '') return;

  try {
    const results = await getProductsByQuery(query);

    if (results.length === 0) {
      refs.notFound.classList.add('not-found--visible');
    } else {
      renderProducts(results.slice(0, 12));
    }
  } catch (err) {
    iziToast.error({ message: 'Product search error', position: 'topRight' });
  }
}

export async function handleClearSearch() {
  refs.searchInput.value = '';
  refs.clearSearchBtn.hidden = true;
  refs.notFound.classList.remove('not-found--visible');
  refs.productsList.innerHTML = '';

  try {
    const products = await getProducts({ limit: 12, skip: 0 });
    renderProducts(products);
  } catch {
    iziToast.error({
      message: 'Failed to load products',
      position: 'topRight',
    });
  }
}

export function handleSearchInput(event) {
  const query = event.target.value.trim();
  refs.clearSearchBtn.hidden = query === '';
}
