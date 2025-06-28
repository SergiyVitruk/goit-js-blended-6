import { productRender } from './render-function';
import { getProducts, getProductsByCategories } from './products-api';

// Функції, які передаються колбеками в addEventListners
export function handleClickCategory(event) {
  if (!event.target.classList.contains('categories__btn')) {
    return;
  }
  const allButtonsCategories = document.querySelectorAll('.categories__btn');
  allButtonsCategories.forEach(btn =>
    btn.classList.remove('categories__btn--active')
  );
  event.target.classList.add('categories__btn--active');
  const categoryName = event.target.textContent.trim();

  if (categoryName === 'All') {
    getProducts().then(productRender).catch(console.error);
  } else {
    getProductsByCategories(categoryName)
      .then(productRender)
      .catch(console.error);
  }
}
