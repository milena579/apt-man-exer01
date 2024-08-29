// Declaração da variável produtos fora do escopo do evento para torná-la global
let produtos;

window.onload = function () {
  var storedUser = localStorage.getItem("usuario");
  var user = JSON.parse(storedUser);
  document.getElementById("user").textContent = user.name;
  document.getElementById("perfil").textContent = user.name;
  document.getElementById("idPerfil").textContent = user.id;
};

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

        const status = document.createElement("div");
        status.className = "status";

        if(produto.status == false){
          status.style.backgroundColor = 'red'
        } else{
          status.style.backgroundColor = 'green'
        }


        card.appendChild(cardHead);
        card.appendChild(cardBody);

        cardHead.appendChild(imagem);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPreco);
        cardBody.appendChild(cardDescricao);
        cardBody.appendChild(status);

        produtosContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON", error));

  $("#produtos-container").on(
    "click",
    ".btn-adicionar-ao-carrinho",
    function () {
      const indexDoProduto = $(this).data("indice");
      const produtoSelecionado = produtos[indexDoProduto];
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(produtoSelecionado);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
  );
});
