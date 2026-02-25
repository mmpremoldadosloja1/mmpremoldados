// ===============================
// BANCO DE PRODUTOS CENTRAL
// ===============================

const produtos = {

  "pingadeiras": [
    {
      nome: "Estilo Casinha",
      tipo: "variacao",
      medidas: ["1m x 20cm","1m x 23cm","1m x 25cm","1m x 30cm"]
    },
    {
      nome: "Estilo Reta",
      tipo: "variacao",
      medidas: ["1m x 20cm","1m x 23cm","1m x 25cm","1m x 30cm","1m x 40cm"]
    },
    {
      nome: "Estilo Degraus",
      tipo: "variacao",
      medidas: ["1m x 20cm"]
    }
  ],

  "revestimento-parede": [
    { nome: "Revestimento 3D 30x30cm", tipo: "unidade" },
    { nome: "Revestimento Pedra Lascada 50x20cm", tipo: "unidade" }
  ],

  "meio-fio-jardim": [
    { nome: "Meio-Fio Arredondado 80x25x8cm", tipo: "unidade" },
    { nome: "Meio-Fio Cordão 80x25x4cm", tipo: "unidade" },
    { nome: "Guia de Jardim Ondulado 80x20x4cm", tipo: "unidade" }
  ],

  "lajes": [
    {
      nome: "Laje Teto H8",
      tipo: "metragem",
      medidas: ["7,5cm x 33cm","7,5cm x 40cm"]
    },
    {
      nome: "Laje Piso H10",
      tipo: "metragem",
      medidas: ["9cm x 33cm","9cm x 40cm"]
    }
  ]
};


// ===============================
// CARRINHO GLOBAL
// ===============================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


// ===============================
// CARREGAR PRODUTOS
// ===============================

function carregarProdutos() {

  const container = document.getElementById("produtosContainer");
  if (!container) return;

  container.innerHTML = "";

  const params = new URLSearchParams(window.location.search);
  let categoria = params.get("categoria");

  // 🔥 SE ESTIVER NA HOME (SEM CATEGORIA) MOSTRA TODOS OS PRODUTOS
  if (!categoria) {

    Object.keys(produtos).forEach(cat => {
      produtos[cat].forEach(produto => {
        container.innerHTML += `
          <div class="card">
            <h3>${produto.nome}</h3>
          </div>
        `;
      });
    });

    return;
  }

  // 🔥 SE ESTIVER EM PÁGINA DE CATEGORIA
  if (!produtos[categoria]) return;

  produtos[categoria].forEach(produto => {

    if (produto.tipo === "variacao") {

      let opcoes = produto.medidas.map(m =>
        `<option>${m}</option>`
      ).join("");

      container.innerHTML += `
        <div class="card">

          <div class="imagem-centro">
            Imagem será adicionada aqui
          </div>

          <h3>${produto.nome}</h3>

          <select class="medida">
            ${opcoes}
          </select>

          <div class="contador">
            <button onclick="alterarQtd(this,-1)">−</button>
            <span class="qtd">1</span>
            <button onclick="alterarQtd(this,1)">+</button>
          </div>

          <button class="btn" onclick="addVariacao('${produto.nome}', this)">
            Adicionar ao carrinho
          </button>

        </div>
      `;
    }

    if (produto.tipo === "unidade") {

      container.innerHTML += `
        <div class="card">
          <h3>${produto.nome}</h3>

          <div class="contador">
            <button onclick="alterarQtd(this,-1)">−</button>
            <span class="qtd">1</span>
            <button onclick="alterarQtd(this,1)">+</button>
          </div>

          <button class="btn" onclick="addUnidade('${produto.nome}', this)">
            Adicionar ao carrinho
          </button>
        </div>
      `;
    }

    if (produto.tipo === "metragem") {

      let opcoes = produto.medidas.map(m =>
        `<option>${m}</option>`
      ).join("");

      container.innerHTML += `
        <div class="card">
          <h3>${produto.nome}</h3>

          <select class="medida">
            <option value="">Selecionar medida</option>
            ${opcoes}
          </select>

          <input type="number" class="metragem hidden" placeholder="Digite m²">

          <button class="btn hidden" onclick="addMetragem('${produto.nome}', this)">
            Adicionar ao carrinho
          </button>
        </div>
      `;
    }

  });

  if (typeof ativarEventos === "function") {
    ativarEventos();
  }
}


// ===============================
// CONTADOR
// ===============================

function alterarQtd(botao, valor) {
  const contador = botao.parentElement;
  const qtdSpan = contador.querySelector('.qtd');
  let qtd = parseInt(qtdSpan.innerText);
  qtd = Math.max(1, qtd + valor);
  qtdSpan.innerText = qtd;
}


// ===============================
// ADICIONAR AO CARRINHO
// ===============================

function addVariacao(nome, botao){

  const card = botao.closest('.card');
  const medida = card.querySelector('.medida').value;
  const qtd = parseInt(card.querySelector('.qtd').innerText);

  const nomeCompleto = nome + " - " + medida;

  const existente = carrinho.find(item => item.nome === nomeCompleto);

  if (existente) {
    existente.qtd += qtd;
  } else {
    carrinho.push({ nome: nomeCompleto, qtd });
  }

  salvarCarrinho();
  alert("Produto adicionado ao carrinho");
}

function addUnidade(nome, botao){

  const card = botao.closest(".card");
  const qtd = parseInt(card.querySelector(".qtd").innerText);

  carrinho.push({ nome, qtd });
  salvarCarrinho();
  alert("Adicionado ao carrinho!");
}

function addMetragem(nome, botao){

  const card = botao.closest(".card");
  const medida = card.querySelector(".medida").value;
  const m2 = card.querySelector(".metragem").value;

  if (!medida || !m2) return alert("Preencha todos os campos!");

  carrinho.push({
    nome: `${nome} - ${medida}`,
    qtd: `${m2}m²`
  });

  salvarCarrinho();
  alert("Adicionado ao carrinho!");
}


// ===============================
// INICIAR
// ===============================

document.addEventListener("DOMContentLoaded", carregarProdutos);
