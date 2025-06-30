//Обʼєкт з посиланнями на ДОМ елементи
export const refs = {
  categoriesList: document.querySelector('.categories'),
  productsList: document.querySelector('.products'),
  modal: document.querySelector('.modal'),
  modalContent: document.querySelector('.modal__content'),
  searchForm: document.querySelector('form.search-form'),
  searchInput: document.querySelector('.search-form__input'),
  clearSearchBtn: document.querySelector('.search-form__btn-clear'),
  notFound: document.querySelector('div.not-found'),
  countCart: document.querySelector('span[data-count="cart"]'),
  countWishlist: document.querySelector('span[data-count="wishlist"]'),
  loader: document.querySelector('.loader'),
};
