"use strict";

const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
let currentPage = 1;
const productsPerPage = 6;

// Função para buscar produtos na API e exibir na página
async function fetchProducts(query, page) {
    try {
        const response = await fetch(`${url}${query}&limit=${productsPerPage}&offset=${(page - 1) * productsPerPage}`);
        const data = await response.json();

        // Limpa a lista de produtos antes de popular
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        // Verifica se há resultados
        if (data.results.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'Nenhum produto encontrado.';
            productList.appendChild(noResultsMessage);
            return;
        }

        // Cria cards de produtos para cada item retornado
        data.results.forEach(produto => {
            // Criação do card de produto
            const divCol = document.createElement('div');
            divCol.classList.add('col-md-2');

            const divCard = document.createElement('div');
            divCard.classList.add('product-card', 'shadow-sm');

            // Foto do produto
            const imgProduto = document.createElement('img');
            imgProduto.src = produto.thumbnail;
            imgProduto.classList.add('img-fluid');
            divCard.appendChild(imgProduto);

            // Título do anúncio
            const tituloProduto = document.createElement('p');
            tituloProduto.textContent = produto.title;
            tituloProduto.classList.add('product-title');
            divCard.appendChild(tituloProduto);

            // Preço do produto
            const precoProduto = document.createElement('h3');
            precoProduto.textContent = `R$ ${produto.price.toFixed(2)}`;
            precoProduto.classList.add('product-price');
            divCard.appendChild(precoProduto);

            // Indicador de frete grátis
            if (produto.shipping.free_shipping) {
                const freteGratis = document.createElement('p');
                freteGratis.textContent = 'Frete Grátis';
                freteGratis.classList.add('free-shipping');
                divCard.appendChild(freteGratis);
            }

            divCol.appendChild(divCard);
            productList.appendChild(divCol);
        });

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Paginação: avançar para a próxima página de produtos
document.getElementById('next-page').addEventListener('click', () => {
    currentPage++;
    fetchProducts('coisa', currentPage);
});

// Paginação: retroceder para a página anterior de produtos
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchProducts('coisa', currentPage);
    }
});

// Chamada inicial para buscar produtos (substitua 'coisa' pela sua consulta desejada)
fetchProducts('coisa', currentPage);