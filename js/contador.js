/* ========================= */
/* CONTADOR GLOBAL */
/* ========================= */

function alterarQtd(input, valor){
  let qtd = parseInt(input.value) || 1;
  qtd = Math.max(1, qtd + valor);
  input.value = qtd;
}

function segurar(btn, input, valor){
  alterarQtd(input, valor);

  btn._interval = setInterval(()=>{
    alterarQtd(input, valor);
  }, 120);
}

function parar(btn){
  clearInterval(btn._interval);
}

document.addEventListener("DOMContentLoaded", ()=>{

  document.querySelectorAll('.contador').forEach(contador=>{

    const botoes = contador.querySelectorAll('button');
    const input = contador.querySelector('input');

    const menos = botoes[0];
    const mais = botoes[1];

    /* - */
    menos.onmousedown = () => segurar(menos, input, -1);
    menos.onmouseup = () => parar(menos);
    menos.onmouseleave = () => parar(menos);

    menos.ontouchstart = () => segurar(menos, input, -1);
    menos.ontouchend = () => parar(menos);

    /* + */
    mais.onmousedown = () => segurar(mais, input, 1);
    mais.onmouseup = () => parar(mais);
    mais.onmouseleave = () => parar(mais);

    mais.ontouchstart = () => segurar(mais, input, 1);
    mais.ontouchend = () => parar(mais);

    /* DIGITAÇÃO */
    input.oninput = ()=>{
      if(input.value < 1 || input.value === ""){
        input.value = 1;
      }
    };

  });

});
