// =========================
// CARRINHO GLOBAL
// =========================

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let carrinho =
  JSON.parse(localStorage.getItem('carrinho')) || [];

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
  if(
    overlayEl &&
    window.innerWidth < 900
  ){
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
   PEGAR IMAGEM
========================= */
function pegarImagem(card){

  if(!card) return "";

  const img =
    card.querySelector("img");

  if(img && img.src){

    return img.src;

  }

  return "";
}

/* =========================
   ADICIONAR PRODUTO
========================= */
function adicionarCarrinho(botao){

  const card = botao.closest('.card');
  const card =
    botao.closest('.card');

  if(!card) return;

  const titulo =
    card.querySelector('h3');

  const qtdInput =
    card.querySelector('.qtd');

  const select =
    card.querySelector('select');

  const imagem =
    pegarImagem(card);

  const nome =
    titulo
    ? titulo.innerText.trim()
    : "Produto";

  const qtd =
    qtdInput
    ? parseInt(qtdInput.value)
    : 1;

  let nomeFinal = nome;

  // se tiver variação
  if(select){
  // VARIAÇÃO
  if(
    select &&
    select.value
  ){

    nomeFinal += `
${select.value}`;
    nomeFinal +=
      "\n" + select.value;

  }

  // procura existente
  // EXISTENTE
  const existente =
    carrinho.find(
      item => item.nome === nomeFinal
    );

  if(existente){

    existente.qtd += qtd;

  }else{

    carrinho.push({

      nome: nomeFinal,
      qtd: qtd

      qtd: qtd,

      imagem: imagem

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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="1.8"
          width="50"
          height="50"
        >

          <circle cx="9" cy="20" r="1"></circle>

          <circle cx="18" cy="20" r="1"></circle>

          <path d="M1 1h4l2.5 12h11.5l2-8H6"></path>

        </svg>

        <p>Seu carrinho está vazio</p>
        <p>
          Seu carrinho está vazio
        </p>

        <span>Adicione produtos para continuar</span>
        <span>
          Adicione produtos para continuar
        </span>

      </div>

    `;

    return;
  }

  carrinho.forEach((item, i)=>{

    // separa linhas
    const linhas =
      String(item.nome).split("\n");

    const titulo =
      linhas[0] || "";

    const subtitulo =
      linhas[1] || "";

    const detalhe1 =
      linhas[2] || "";

    const detalhe2 =
      linhas[3] || "";

    const destaque =
      linhas[4] || "";
    const detalhes =
      linhas.slice(1);

    lista.innerHTML += `

      <div class="item">

        <div class="linha-vermelha"></div>
        ${
          item.imagem
          ?
          `
          <img
            class="img-item"
            src="${item.imagem}"
            alt="${titulo}"
          >
          `
          :
          ""
        }

        <div class="info-item">

          <div class="titulo-item">
            ${titulo}
          </div>

          ${
            subtitulo
            ?
            `<div class="subtitulo-item">
              ${subtitulo}
            </div>`
            : ""
          }
            detalhes.map(det => `

          ${
            detalhe1
            ?
            `<div class="detalhe-produto">
              ${detalhe1}
            </div>`
            : ""
          }
              <div class="detalhe-produto">
                ${det}
              </div>

          ${
            detalhe2
            ?
            `<div class="detalhe-produto">
              ${detalhe2}
            </div>`
            : ""
          }

          ${
            destaque
            ?
            `<div class="destaque-item">
              ${destaque}
            </div>`
            : ""
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

          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" width="18" height="18">

            <path d="M3 6h18"></path>

            <path d="M8 6V4h8v2"></path>

            <path d="M6 6l1 14h10l1-14"></path>

            <path d="M10 11v6"></path>

            <path d="M14 11v6"></path>

          </svg>
          🗑️

        </button>

      </div>

    `;

  });

}

/* =========================
   WHATSAPP
========================= */
function enviarWhatsApp(){

  let msg =
`🛒 *NOVO PEDIDO* 
`🛒 *NOVO PEDIDO*

`;

  carrinho.forEach((item, index)=>{

    const linhas =
      String(item.nome).split("\n");

    msg += `*${index + 1}. ${linhas[0]}*\n`;
    msg +=
`*${index + 1}. ${linhas[0]}*
`;

    linhas
      .slice(1)
      .forEach(linha=>{

    linhas.slice(1).forEach(linha=>{
        msg += `${linha}\n`;

      msg += `${linha}\n`;
      });

    });
    msg +=
`Quantidade: ${item.qtd}

    msg += `Quantidade: ${item.qtd}\n`;
----------------------

    msg += `\n----------------------\n\n`;
`;

  });

  window.open(
    `https://wa.me/5561999385680?text=${encodeURIComponent(msg)}`
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

  // desktop fixo
  // LIMPA CARRINHO ANTIGO
  // QUEBRADO DO CHROME

  carrinho = carrinho.map(item=>({

    nome:
      item.nome || "Produto",

    qtd:
      parseInt(item.qtd) || 1,

    imagem:
      item.imagem || ""

  }));

  localStorage.setItem(
    'carrinho',
    JSON.stringify(carrinho)
  );

  // DESKTOP FIXO
  if(window.innerWidth >= 900){

    document
      .getElementById("carrinho")
      ?.classList.add("active");

  }

  renderCarrinho();

});
