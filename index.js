import"./assets/styles-BK7AYJoX.js";import{a as c,i as _}from"./assets/vendor-D_elxl8o.js";const a="https://dummyjson.com",m="/products/category-list",y="/products",$="/products/category/",f=1;async function b(){return(await c.get(`${a}${m}`)).data}async function i(){return(await c.get(`${a}${y}?limit=12&skip=${(f-1)*12}`)).data.products}async function L(t){return(await c.get(`${a}${$}${t}`)).data.products}const d=document.querySelector(".categories"),n=document.querySelector(".products");function C(t){return t.map(e=>`<li class="categories__item">
   <button class="categories__btn" type="button">${e}</button>
 </li>
`).join("")}async function h(){try{const e=["All",...await b()];d.insertAdjacentHTML("beforeend",C(e))}catch(t){console.error(t),_.error({message:"Loading error"})}}function P(t){return t.map(({id:e,thumbnail:s,title:r,description:u,brand:l,category:p,price:g})=>`<li class="products__item" data-id="${e}">
    <img class="products__image" src="${s}" alt="${u}"/>
    <p class="products__title">${r}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${l}</p>
    <p class="products__category">Category: ${p}</p>
    <p class="products__price">Price: ${g}$</p>
 </li>
  `).join("")}function o(t){n.innerHTML="",n.insertAdjacentHTML("afterbegin",P(t))}function A(t){if(!t.target.classList.contains("categories__btn"))return;document.querySelectorAll(".categories__btn").forEach(r=>r.classList.remove("categories__btn--active")),t.target.classList.add("categories__btn--active");const s=t.target.textContent.trim();s==="All"?i().then(o).catch(console.error):L(s).then(o).catch(console.error)}h();i().then(o).catch(console.error);d.addEventListener("click",A);
//# sourceMappingURL=index.js.map
