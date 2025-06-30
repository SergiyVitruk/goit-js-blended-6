import { getFromStorage } from './storage.js';
import { getProductsById } from './products-api.js';
import { renderProducts } from './render-function.js';
import { refs } from './refs.js';
import iziToast from 'izitoast';

//Логіка сторінки Wishlist
async function renderWishlistPage() {
  const ids = getFromStorage('wishlist');
  if (ids.length === 0) {
    refs.productsList.innerHTML = '';
    refs.notFound.classList.add('not-found--visible');
    return;
  }

  try {
    const promises = ids.map(id => getProductsById(id));
    const products = await Promise.all(promises);
    renderProducts(products);
  } catch {
    iziToast.error({ message: 'Could not load wishlist' });
  }
}

renderWishlistPage();
