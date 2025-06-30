import { refs } from './refs.js';
import { getFromStorage } from './storage.js';

//Допоміжні функції
export function updateCounters() {
  refs.countCart.textContent = getFromStorage('cart').length;
  refs.countWishlist.textContent = getFromStorage('wishlist').length;
}

export function showLoader() {
  refs.loader.classList.remove('hidden');
}

export function hideLoader() {
  refs.loader.classList.add('hidden');
}

const scrollBtn = document.querySelector('.scroll-up');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.hidden = false;
  } else {
    scrollBtn.hidden = true;
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
