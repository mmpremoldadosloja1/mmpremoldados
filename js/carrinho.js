// =========================
// CARRINHO GLOBAL
// =========================

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

  // VARIAÇÃO
  if(
    select &&
    select.value
  ){

    nomeFinal +=
      "\n" + select.value;

  }

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

        <p>
          Seu carrinho está vazio
        </p>

        <span>
          Adicione produtos para continuar
        </span>

      </div>

    `;

    return;
  }

  carrinho.forEach((item, i)=>{

    const linhas =
      String(item.nome).split("\n");

    const titulo =
      linhas[0] || "";

    const detalhes =
      linhas.slice(1);

    lista.innerHTML += `

      <div class="item">

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

`;

  carrinho.forEach((item, index)=>{

    const linhas =
      String(item.nome).split("\n");

    msg +=
`*${index + 1}. ${linhas[0]}*
`;

    linhas
      .slice(1)
      .forEach(linha=>{

        msg += `${linha}\n`;

      });

    msg +=
`Quantidade: ${item.qtd}

----------------------

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
