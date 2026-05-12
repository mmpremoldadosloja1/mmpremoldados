// =========================
// CARRINHO GLOBAL
// =========================

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

/* =========================
   SALVAR
========================= */
function salvarCarrinho(){

  localStorage.setItem(
    'carrinho',
    JSON.stringify(carrinho)
  );

  renderCarrinho();
}

/* =========================
   ABRIR
========================= */
function abrirCarrinho(){

  const carrinhoEl =
    document.getElementById("carrinho");

  const overlayEl =
    document.getElementById("overlay");

  if(carrinhoEl){
    carrinhoEl.classList.add("active");
  }

  if(overlayEl && window.innerWidth < 900){
    overlayEl.classList.add("active");
  }

  renderCarrinho();
}

/* =========================
   FECHAR
========================= */
function fecharCarrinho(){

  const carrinhoEl =
    document.getElementById("carrinho");

  const overlayEl =
    document.getElementById("overlay");

  if(carrinhoEl){
    carrinhoEl.classList.remove("active");
  }

  if(overlayEl){
    overlayEl.classList.remove("active");
  }
}

/* =========================
   REMOVER
========================= */
function removerItem(i){

  carrinho.splice(i,1);

  salvarCarrinho();
}

/* =========================
   ADICIONAR PRODUTO
========================= */
function adicionarCarrinho(botao){

  const card = botao.closest('.card');

  if(!card) return;

  const titulo =
    card.querySelector('h3');

  const qtdInput =
    card.querySelector('.qtd');

  const select =
    card.querySelector('select');

  const imagem =
    card.querySelector('img');

  const nome =
    titulo
    ? titulo.innerText.trim()
    : "Produto";

  const qtd =
    qtdInput
    ? parseInt(qtdInput.value)
    : 1;

  let nomeFinal = nome;

  if(select){

    nomeFinal += `\n${select.value}`;

  }

  const existente =
    carrinho.find(
      item => item.nome === nomeFinal
    );

  if(existente){

    existente.qtd += qtd;

  }else{

    carrinho.push({

      nome: nomeFinal,

      qtd: qtd,

      imagem: imagem
        ? imagem.src
        : ""

    });

  }

  salvarCarrinho();

  abrirCarrinho();
}

/* =========================
   RENDER
========================= */
function renderCarrinho(){

  const lista =
    document.getElementById("lista");

  if(!lista) return;

  lista.innerHTML = "";

  if(carrinho.length === 0){

    lista.innerHTML = `

      <div class="carrinho-vazio">

        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" width="50" height="50">

          <circle cx="9" cy="20" r="1"></circle>

          <circle cx="18" cy="20" r="1"></circle>

          <path d="M1 1h4l2.5 12h11.5l2-8H6"></path>

        </svg>

        <p>Seu carrinho está vazio</p>

        <span>Adicione produtos para continuar</span>

      </div>

    `;

    return;
  }

  carrinho.forEach((item, i)=>{

    const linhas =
      String(item.nome).split("\n");

    const titulo =
      linhas[0];

    const detalhes =
      linhas.slice(1);

    lista.innerHTML += `

      <div class="item">

        <img
          class="img-item"
          src="${item.imagem || ''}"
        >

        <div class="info-item">

          <div class="titulo-item">
            ${titulo}
          </div>

          ${
            detalhes.map(det => `

              <div class="detalhe-produto">
                ${det}
              </div>

            `).join("")
          }

          <div class="qtd-item">

            Quantidade:
            <strong>${item.qtd}</strong>

          </div>

        </div>

        <button
          class="remover"
          onclick="removerItem(${i})"
        >

          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" width="20" height="20">

            <path d="M3 6h18"></path>

            <path d="M8 6V4h8v2"></path>

            <path d="M6 6l1 14h10l1-14"></path>

            <path d="M10 11v6"></path>

            <path d="M14 11v6"></path>

          </svg>

        </button>

      </div>

    `;

  });

}

/* =========================
   WHATSAPP
========================= */
function enviarWhatsApp(){

  let msg = "Pedido:%0A%0A";

  carrinho.forEach(item=>{

    msg += `${item.nome}%0A`;
    msg += `Quantidade: ${item.qtd}%0A%0A`;

  });

  window.open(
    `https://wa.me/5561999385680?text=${msg}`
  );
}

/* =========================
   CONTADOR
========================= */
function aumentar(btn){

  const input =
    btn.parentElement.querySelector('.qtd');

  input.value =
    parseInt(input.value) + 1;
}

function diminuir(btn){

  const input =
    btn.parentElement.querySelector('.qtd');

  input.value =
    Math.max(
      1,
      parseInt(input.value) - 1
    );
}

/* =========================
   LOAD
========================= */
window.addEventListener("load", ()=>{

  if(window.innerWidth >= 900){

    document
      .getElementById("carrinho")
      ?.classList.add("active");

  }

  renderCarrinho();

});
