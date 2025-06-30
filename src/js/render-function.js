//Функцію для створення, рендеру або видалення розмітки

export function renderCategories(categories, selectedCategory = 'All') {
  const list = document.querySelector('ul.categories');
  const markup = categories
    .map(
      category => `
    <li class="categories__item">
      <button class="categories__btn ${
        selectedCategory === category ? 'categories__btn--active' : ''
      }" type="button">${category}</button>
    </li>`
    )
    .join('');
  list.innerHTML = markup;
}

export function renderProducts(products) {
  const list = document.querySelector('ul.products');
  const markup = products
    .map(
      ({ id, thumbnail, title, description, brand, category, price }) => `
    <li class="products__item" data-id="${id}">
      <img class="products__image" src="${thumbnail}" alt="${title}"/>
      <p class="products__title">${title}</p>
      <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
      <p class="products__category">Category: ${category}</p>
      <p class="products__price">Price: ${price}$</p>
    </li>`
    )
    .join('');
  list.innerHTML += markup;
}
