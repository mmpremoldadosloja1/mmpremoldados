// =========================
// CARRINHO GLOBAL
// =========================

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// SALVAR
function salvarCarrinho(){
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderCarrinho();
}

// ABRIR
function abrirCarrinho(){
  document.getElementById("carrinho")?.classList.add("active");
  document.getElementById("overlay")?.classList.add("active");
  renderCarrinho();
}

// FECHAR
function fecharCarrinho(){
  document.getElementById("carrinho")?.classList.remove("active");
  document.getElementById("overlay")?.classList.remove("active");
}

// REMOVER ITEM
function removerItem(index){
  carrinho.splice(index, 1);
  salvarCarrinho();
}

// RENDER
function renderCarrinho(){
  const lista = document.getElementById("lista");
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
    let texto = "";

    if(item.nome === "Laje"){
      texto = `
        <div class="titulo-item">Laje ${item.tipo}</div>
        <div class="detalhe">Isopor: ${item.iso}</div>
        <div class="detalhe">${item.c} x ${item.l} = <strong>${item.m2} m²</strong></div>
      `;
    }

    if(item.nome === "Viga"){
      texto = `
        <div class="titulo-item">Viga ${item.tipo}</div>
        <div class="detalhe">Tamanho: ${item.tam}</div>
        <div class="detalhe">Quantidade: <strong>${item.qtd}</strong></div>
      `;
    }

    if(item.nome === "Isopor"){
      texto = `
        <div class="titulo-item">Isopor</div>
        <div class="detalhe">Tipo: ${item.tipo}</div>
        <div class="detalhe">Quantidade: <strong>${item.qtd}</strong></div>
      `;
    }

    lista.innerHTML += `
      <div class="item">
        <div class="info-item">${texto}</div>

        <button class="remover" onclick="removerItem(${i})">
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

// WHATSAPP
function enviarWhatsApp(){
  let msg = "Pedido:%0A";

  carrinho.forEach(item=>{
    if(item.nome === "Laje"){
      msg += `Laje ${item.tipo} | ${item.iso} | ${item.c}x${item.l} (${item.m2}m²)%0A`;
    }

    if(item.nome === "Viga"){
      msg += `Viga ${item.tipo} | ${item.tam} | Qtd:${item.qtd}%0A`;
    }

    if(item.nome === "Isopor"){
      msg += `Isopor ${item.tipo} | Qtd:${item.qtd}%0A`;
    }
  });

  window.open(`https://wa.me/5561999385680?text=${msg}`);
}

// CARREGAR
window.addEventListener("load", ()=>{
  if(window.innerWidth >= 900){
    document.getElementById("carrinho")?.classList.add("active");
  }
  renderCarrinho();
});
