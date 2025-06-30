import { getFromStorage } from './storage.js';
import { getProductsById } from './products-api.js';
import { renderProducts } from './render-function.js';
import { refs } from './refs.js';
import iziToast from 'izitoast';

//Логіка сторінки Cart
const totalEl = document.querySelector('.cart__total'); // e.g. <p>Total: $<span></span></p>
const itemsEl = document.querySelector('.cart__items'); // e.g. <p>Items: <span></span></p>
const buyBtn = document.querySelector('.cart__buy-btn');

async function renderCartPage() {
  const ids = getFromStorage('cart');
  if (ids.length === 0) {
    refs.productsList.innerHTML = '';
    refs.notFound.classList.add('not-found--visible');
    totalEl.textContent = '0';
    itemsEl.textContent = '0';
    return;
  }

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
