import"./assets/styles-BK7AYJoX.js";import{a as s,i as o}from"./assets/vendor-D_elxl8o.js";const e="https://dummyjson.com",u="/products/category-list",l="/products",g=2;async function m(){return(await s.get(`${e}${u}`)).data}async function _(){return(await s.get(`${e}${l}?limit=12&skip=${(g-1)*12}`)).data.products}const $=document.querySelector(".categories"),y=document.querySelector(".products");function b(t){return t.map(r=>`<li class="categories__item">
   <button class="categories__btn" type="button">${r}</button>
 </li>
`).join("")}async function f(){try{const r=["All",...await m()];$.insertAdjacentHTML("beforeend",b(r))}catch(t){console.error(t),o.error({message:"Loading error"})}}function L(t){return t.map(({id:r,thumbnail:a,title:c,description:n,brand:i,category:d,price:p})=>`<li class="products__item" data-id="${r}">
    <img class="products__image" src="${a}" alt="${n}"/>
    <p class="products__title">${c}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${i}</p>
    <p class="products__category">Category: ${d}</p>
    <p class="products__price">Price: ${p}$</p>
 </li>
  `).join("")}async function P(){try{const t=await _();console.log(t),y.insertAdjacentHTML("afterbegin",L(t))}catch(t){console.error(t),o.error({message:"Loading error"})}}f();P();
//# sourceMappingURL=index.js.map
