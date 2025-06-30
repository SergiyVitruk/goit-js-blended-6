import { refs } from './refs.js';
import { isInStorage, toggleItemInStorage } from './storage.js';
import { updateCounters } from './helpers.js';

//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

export function renderModalContent(product) {
  const { id, thumbnail, title, description, price, category, brand } = product;

  const inWishlist = isInStorage('wishlist', id);
  const inCart = isInStorage('cart', id);

  const modalProduct = refs.modalContent.querySelector('.modal-product');
  if (!modalProduct) return console.error('modal-product not found');

  modalProduct.innerHTML = `
    <img class="modal-product__img" src="${thumbnail}" alt="${title}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${title}</p>
      <ul class="modal-product__tags">
        <li>Brand: ${brand}</li>
        <li>Category: ${category}</li>
      </ul>
      <p class="modal-product__description">${description}</p>
      <p class="modal-product__shipping-information">Shipping: Free</p>
      <p class="modal-product__return-policy">Return Policy: 30 days</p>
      <p class="modal-product__price">Price: $${price}</p>
    </div>
  `;

  const wishlistBtn = refs.modalContent.querySelector(
    '.modal-product__btn--wishlist'
  );
  const cartBtn = refs.modalContent.querySelector('.modal-product__btn--cart');

  if (wishlistBtn) {
    wishlistBtn.textContent = inWishlist
      ? 'Remove from Wishlist'
      : 'Add to Wishlist';
    wishlistBtn.dataset.id = id;
  }

  if (cartBtn) {
    cartBtn.textContent = inCart ? 'Remove from Cart' : 'Add to Cart';
    cartBtn.dataset.id = id;
  }
}

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  window.addEventListener('keydown', handleEsc);
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  const modalProduct = refs.modalContent.querySelector('.modal-product');
  if (modalProduct) {
    modalProduct.innerHTML = '';
  }
  window.removeEventListener('keydown', handleEsc);
}

function handleEsc(event) {
  if (event.key === 'Escape') closeModal();
}

refs.modal.addEventListener('click', event => {
  if (
    event.target === refs.modal ||
    event.target.closest('.modal__close-btn')
  ) {
    closeModal();
  }
});

refs.modalContent.addEventListener('click', event => {
  const wishlistBtn = event.target.closest('.modal-product__btn--wishlist');
  const cartBtn = event.target.closest('.modal-product__btn--cart');

  if (wishlistBtn) {
    const id = +wishlistBtn.dataset.id;
    console.log('Wishlist toggle', id);
    toggleItemInStorage('wishlist', id);
    wishlistBtn.textContent = isInStorage('wishlist', id)
      ? 'Remove from Wishlist'
      : 'Add to Wishlist';
    updateCounters();
  }

  if (cartBtn) {
    const id = +cartBtn.dataset.id;
    console.log('Cart toggle', id);
    toggleItemInStorage('cart', id);
    cartBtn.textContent = isInStorage('cart', id)
      ? 'Remove from Cart'
      : 'Add to Cart';
    updateCounters();
  }
});
