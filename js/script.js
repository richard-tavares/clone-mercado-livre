"use strict";

const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const PRODUCTS_PER_PAGE = 6;
let currentPage = 1;

const productList = document.getElementById('product-list');
const nextPageButton = document.getElementById('next-page');
const prevPageButton = document.getElementById('prev-page');

const fetchProducts = async (query, page) => {
    try {
        const offset = (page - 1) * PRODUCTS_PER_PAGE;
        const response = await fetch(`${API_URL}${query}&limit=${PRODUCTS_PER_PAGE}&offset=${offset}`);
        const data = await response.json();

        renderProductList(data.results);
    } catch (error) {
        console.error(error);
    }
};

const renderProductList = (products) => {
    productList.innerHTML = '';

    if (!products.length) {
        productList.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    products.forEach(renderProductCard);
};

const renderProductCard = (product) => {
    const divCol = createElement('div', ['col-lg-2', 'col-md-4', 'col-sm-12']);
    const divCard = createElement('div', ['product-card']);

    const productImage = createElement('img', ['product-image', 'img-fluid'], { src: product.thumbnail, alt: product.title });
    divCard.appendChild(productImage);

    const productTitle = createElement('p', ['product-title'], {}, product.title);
    divCard.appendChild(productTitle);

    const productPrice = createElement('h3', ['product-price'], {}, `R$ ${product.price.toFixed(2)}`);
    divCard.appendChild(productPrice);

    if (product.shipping.free_shipping) {
        const freeShiping = createElement('p', ['free-shipping'], {}, 'Frete Grátis');
        divCard.appendChild(freeShiping);
    }

    divCol.appendChild(divCard);
    productList.appendChild(divCol);
};

const createElement = (tag, classes = [], attributes = {}, innerText = '') => {
    const element = document.createElement(tag);
    classes.forEach(cls => element.classList.add(cls));
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    if (innerText) element.innerText = innerText;
    return element;
};

nextPageButton.addEventListener('click', () => {
    currentPage++;
    fetchProducts('coisa', currentPage);
});

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchProducts('coisa', currentPage);
    }
});

fetchProducts('coisa', currentPage);