// Declaração da variável produtos fora do escopo do evento para torná-la global
let produtos;

document.addEventListener("DOMContentLoaded", function () {
  fetch("../Dados/loja.json")
    .then((response) => response.json())
    .then((data) => {
      produtos = data;
      const produtosContainer = document.getElementById("produtos-container");

      produtos.map((produto, index) => {
        const card = document.createElement("div");
        card.className = "card";
        
        const cardHead = document.createElement("div");
        cardHead.className = "card-head";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";


        const imagem = document.createElement("img");
        imagem.src = produto.imagem;


        const cardTitle = document.createElement("h3");
        cardTitle.className = "card-title";
        cardTitle.textContent = produto.nome;

        const cardPreco = document.createElement("p");
        cardPreco.textContent = "Preço: $" + produto.preco.toFixed(2);

        const cardDescricao = document.createElement("p");
        cardDescricao.textContent = "Descricao: " + produto.descricao;

        const cardStatus = document.createElement("p");
        cardStatus.textContent = "Status: " + produto.status;


        card.appendChild(cardHead);
        card.appendChild(cardBody);

        cardHead.appendChild(imagem);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPreco);
        cardBody.appendChild(cardDescricao);
        cardBody.appendChild(cardStatus);

        produtosContainer.appendChild(card);
      });
    })
    
});
