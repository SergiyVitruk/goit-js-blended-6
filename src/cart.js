import { getFromStorage } from './js/storage.js';
import { getProductsById } from './js/products-api.js';
import { renderProducts } from './js/render-function.js';
import { refs } from './js/refs.js';
import iziToast from 'izitoast';

//Логіка сторінки Cart
const { productsList, notFound, countCart, countWishlist } = refs;
const totalEl = document.querySelector('.cart__total span');
const itemsEl = document.querySelector('.cart__items span');
const buyBtn = document.querySelector('.cart__buy-btn');

async function renderCartPage() {
  const ids = getFromStorage('cart');
  if (!ids.length) {
    productsList.innerHTML = '';
    notFound.classList.add('not-found--visible');
    totalEl.textContent = '0';
    itemsEl.textContent = '0';
    return;
  }
  notFound.classList.remove('not-found--visible');

  try {
    const products = await Promise.all(ids.map(id => getProductsById(id)));
    renderProducts(products);
    const total = products.reduce((sum, item) => sum + item.price, 0);
    totalEl.textContent = `$${total}`;
    itemsEl.textContent = `${products.length}`;
  } catch {
    iziToast.error({ message: 'Cart error' });
  }
}

buyBtn.addEventListener('click', () => {
  iziToast.success({ message: 'Purchase successful!' });
  localStorage.removeItem('cart');
  renderCartPage();
});

renderCartPage();
