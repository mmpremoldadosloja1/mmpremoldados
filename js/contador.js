function iniciarContadores(){

  document.querySelectorAll('.contador-box').forEach(box=>{

    const input = box.querySelector('.contador-input');
    const btnMais = box.querySelector('.mais');
    const btnMenos = box.querySelector('.menos');

    let intervalo;

    function alterar(valor){
      let qtd = parseInt(input.value) || 1;
      qtd = Math.max(1, qtd + valor);
      input.value = qtd;
    }

    function segurar(botao, valor){
      alterar(valor);
      intervalo = setInterval(()=>alterar(valor), 120);
    }

    function parar(){
      clearInterval(intervalo);
    }

    // CLIQUE NORMAL
    btnMais.onclick = ()=>alterar(1);
    btnMenos.onclick = ()=>alterar(-1);

    // SEGURAR
    btnMais.onmousedown = ()=>segurar(btnMais, 1);
    btnMenos.onmousedown = ()=>segurar(btnMenos, -1);

    btnMais.onmouseup = parar;
    btnMenos.onmouseup = parar;

    btnMais.onmouseleave = parar;
    btnMenos.onmouseleave = parar;

    // MOBILE
    btnMais.ontouchstart = ()=>segurar(btnMais, 1);
    btnMenos.ontouchstart = ()=>segurar(btnMenos, -1);

    btnMais.ontouchend = parar;
    btnMenos.ontouchend = parar;

    // DIGITAÇÃO MANUAL
    input.onchange = ()=>{
      if(input.value < 1 || input.value === ""){
        input.value = 1;
      }
    };

  });

}
