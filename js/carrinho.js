// =========================
// CARRINHO GLOBAL MM
// =========================

let carrinho = [];

try {
  const salvo = JSON.parse(localStorage.getItem("carrinho"));
  carrinho = Array.isArray(salvo) ? salvo : [];
} catch (e) {
  carrinho = [];
}

carrinho = carrinho.map(item => ({
  nome: item.nome || "Produto",
  qtd: Math.max(1, parseInt(item.qtd) || 1),
  imagem: item.imagem || ""
}));

// =========================
// SALVAR CARRINHO
// =========================

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
}

// =========================
// ABRIR CARRINHO
// =========================

function abrirCarrinho() {
  const painel = document.getElementById("carrinho");
  const overlay = document.getElementById("overlay");

  if (painel) painel.classList.add("active");

  if (overlay && window.innerWidth < 900) {
    overlay.classList.add("active");
  }

  renderCarrinho();
}

// =========================
// FECHAR CARRINHO
// =========================

function fecharCarrinho() {
  document.getElementById("carrinho")?.classList.remove("active");
  document.getElementById("overlay")?.classList.remove("active");
}

// =========================
// PEGAR IMAGEM DO PRODUTO
// =========================

function pegarImagem(card) {
  const img = card?.querySelector("img");
  return img ? img.src : "";
}

// =========================
// ADICIONAR PRODUTO
// =========================

function adicionarCarrinho(botao) {
  const card = botao.closest(".card");
  if (!card) return;

  const titulo = card.querySelector("h3");
  const qtdInput = card.querySelector(".qtd");
  const select = card.querySelector("select");

  const nome = titulo ? titulo.innerText.trim() : "Produto";
  const qtd = Math.max(1, parseInt(qtdInput?.value) || 1);
  const imagem = pegarImagem(card);

  // Guarda a variação escolhida, quando existir.
  const nomeFinal = select && select.value
    ? nome + "\n" + select.value
    : nome;

  const existente = carrinho.find(item => item.nome === nomeFinal);

  if (existente) {
    existente.qtd += qtd;
    if (!existente.imagem) existente.imagem = imagem;
  } else {
    carrinho.push({
      nome: nomeFinal,
      qtd: qtd,
      imagem: imagem
    });
  }

  salvarCarrinho();
  abrirCarrinho();
}

// =========================
// RENDERIZAR CARRINHO
// =========================

function renderCarrinho() {
  const lista = document.getElementById("lista");
  if (!lista) return;

  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = `
      <div class="carrinho-vazio">
        <p>Seu carrinho está vazio</p>
        <span>Adicione produtos para continuar</span>
      </div>
    `;
    return;
  }

  carrinho.forEach((item, i) => {
    const linhas = String(item.nome).split("\n");
    const titulo = linhas[0] || "Produto";
    const detalhes = linhas.slice(1);

    const elemento = document.createElement("div");
    elemento.className = "item";

    if (item.imagem) {
      const imagem = document.createElement("img");
      imagem.className = "img-item";
      imagem.src = item.imagem;
      imagem.alt = titulo;
      elemento.appendChild(imagem);
    }

    const info = document.createElement("div");
    info.className = "info-item";

    const nomeElemento = document.createElement("div");
    nomeElemento.className = "titulo-item";
    nomeElemento.textContent = titulo;
    info.appendChild(nomeElemento);

    detalhes.forEach(detalhe => {
      const detalheElemento = document.createElement("div");
      detalheElemento.className = "detalhe-produto";
      detalheElemento.textContent = detalhe;
      info.appendChild(detalheElemento);
    });

    const quantidade = document.createElement("div");
    quantidade.className = "qtd-item";
    quantidade.textContent = "Quantidade: " + item.qtd;
    info.appendChild(quantidade);

    const removerBotao = document.createElement("button");
    removerBotao.className = "remover";
    removerBotao.type = "button";
    removerBotao.textContent = "🗑️";
    removerBotao.setAttribute("aria-label", "Remover " + titulo);
    removerBotao.addEventListener("click", () => removerItem(i));

    elemento.appendChild(info);
    elemento.appendChild(removerBotao);
    lista.appendChild(elemento);
  });
}

// =========================
// REMOVER ITEM
// =========================

function removerItem(i) {
  carrinho.splice(i, 1);
  salvarCarrinho();
}

// Compatibilidade com páginas que usam remover(i).
function remover(i) {
  removerItem(i);
}

// =========================
// CONTADOR DE QUANTIDADE
// =========================

function aumentar(botao) {
  const input = botao.parentElement.querySelector(".qtd");
  if (input) {
    input.value = (Math.max(1, parseInt(input.value) || 1)) + 1;
  }
}

function diminuir(botao) {
  const input = botao.parentElement.querySelector(".qtd");
  if (input) {
    input.value = Math.max(1, (parseInt(input.value) || 1) - 1);
  }
}

// =========================
// MODALIDADE DE ENTREGA
// =========================

function alternarCamposEntrega() {
  const modalidade = document.querySelector(
    'input[name="modalidadeEntrega"]:checked'
  );

  const campos = document.getElementById("camposEndereco");
  if (!campos) return;

  const entrega = modalidade?.value !== "retirada";
  campos.hidden = !entrega;

  campos.querySelectorAll("input").forEach(input => {
    input.required = entrega && [
      "cepEntrega",
      "ruaEntrega",
      "numeroEntrega",
      "bairroEntrega",
      "cidadeEntrega",
      "ufEntrega"
    ].includes(input.id);
  });
}

// =========================
// MONTAR E ENVIAR PEDIDO
// =========================

function enviarWhatsApp() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio. Adicione produtos antes de finalizar.");
    return;
  }

  const pegarValor = id =>
    document.getElementById(id)?.value.trim() || "";

  const nome = pegarValor("nomeRecebedor");
  const telefone = pegarValor("telefoneRecebedor");

  const modalidade = document.querySelector(
    'input[name="modalidadeEntrega"]:checked'
  )?.value || "entrega";

  if (!nome || !telefone) {
    alert("Preencha seu nome completo e WhatsApp para continuar.");
    document.getElementById(!nome ? "nomeRecebedor" : "telefoneRecebedor")
      ?.focus();
    return;
  }

  const enderecoIds = [
    "cepEntrega",
    "ruaEntrega",
    "numeroEntrega",
    "bairroEntrega",
    "cidadeEntrega",
    "ufEntrega"
  ];

  if (modalidade === "entrega") {
    for (const id of enderecoIds) {
      if (!pegarValor(id)) {
        alert("Preencha todos os campos obrigatórios do endereço.");
        document.getElementById(id)?.focus();
        return;
      }
    }
  }

  let mensagem = "🛒 NOVO PEDIDO - MM PRÉ-MOLDADOS\n\n";

  mensagem += "DADOS DO CLIENTE\n";
  mensagem += "Nome: " + nome + "\n";
  mensagem += "WhatsApp: " + telefone + "\n\n";

  if (modalidade === "retirada") {
    mensagem += "Recebimento: RETIRADA NA FÁBRICA\n\n";
  } else {
    mensagem += "Recebimento: ENTREGA\n";
    mensagem += "CEP: " + pegarValor("cepEntrega") + "\n";
    mensagem += "Endereço: " + pegarValor("ruaEntrega") + ", ";
    mensagem += pegarValor("numeroEntrega") + "\n";

    const complemento = pegarValor("complementoEntrega");
    if (complemento) {
      mensagem += "Complemento: " + complemento + "\n";
    }

    mensagem += "Bairro: " + pegarValor("bairroEntrega") + "\n";
    mensagem += "Cidade: " + pegarValor("cidadeEntrega");
    mensagem += " - " + pegarValor("ufEntrega").toUpperCase() + "\n";

    const referencia = pegarValor("referenciaEntrega");
    if (referencia) {
      mensagem += "Ponto de referência: " + referencia + "\n";
    }

    mensagem += "\nFrete: calcular e confirmar separadamente.\n\n";
  }

  mensagem += "PRODUTOS DO PEDIDO\n\n";

  carrinho.forEach((item, index) => {
    const linhas = String(item.nome).split("\n");

    mensagem += (index + 1) + ". " + linhas[0] + "\n";

    linhas.slice(1).forEach(linha => {
      mensagem += "   Opção: " + linha + "\n";
    });

    mensagem += "   Quantidade: " + item.qtd + "\n\n";
  });

  mensagem += "Por favor, confirme os valores e a disponibilidade.";

  const url = "https://wa.me/5561999385680?text=" +
    encodeURIComponent(mensagem);

  window.open(url, "_blank");
}

// =========================
// INICIALIZAÇÃO
// =========================

window.addEventListener("load", () => {
  const painel = document.getElementById("carrinho");

  if (window.innerWidth >= 900 && painel) {
    painel.classList.add("active");
  }

  alternarCamposEntrega();
  renderCarrinho();
});
