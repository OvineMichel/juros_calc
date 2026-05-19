

window.onload = function(){
    let formulario = document.querySelector("#formulario");

    document.querySelector('#limpar').addEventListener('click',function(){ // Função para limpar os textos do formulário
        document.querySelector("#debito").value= '';
        document.querySelector("#juros").value= '';
        document.querySelector("#meses").value= '';
        document.querySelector("#multa").value= '';
    })


    formulario.addEventListener('submit',function(e){
        e.preventDefault(); //Impede o formulário resetar a página (F5)

        let resultados = document.querySelector("#resultados");
        resultados.replaceChildren(); // Remove os resultados anteriores da tabela para repor com novos resultados.

        let debito = this.querySelector("#debito").value;
        let debitoInicial = debito;
        let juros = this.querySelector("#juros").value / 100 + 1; // Calculo para transformar juro de % para valor float (50% --> 1.50)
        let meses = this.querySelector("#meses").value;
        let multa = this.querySelector("#multa").value;
        let aplica_multa = this.querySelector("#opcoes").value; // Define se o usuário escolheu aplicar a multa antes ou depois

        if(aplica_multa == 1){ 
            debito= Number(multa) + Number(debito);
            multa = 0;
        }

        let linhaInicial = document.createElement('div');
        linhaInicial.classList.add("linha-resultado-inicial");

        let textoMes = document.createElement('p');                 
        textoMes.textContent = "Mês";
        
        let textoDebito = document.createElement('p');
        textoDebito.textContent = "Valor";
        
        linhaInicial.appendChild(textoMes); 
        linhaInicial.appendChild(textoDebito);                 
        resultados.appendChild(linhaInicial);  
    

        for(let i=0;i<meses;i++){
            debito = debito * juros; // calculo de juro composto
            if(i == meses - 1){ //verifica se o mês atual do laço é o último, e aplica a multa após o cálculo (Se o usuário escolheu aplicar a multa depois)
                debito += multa;
            }

            let novaLinha = document.createElement('div');  //
            let novoMes = document.createElement('p');     // Crias a linha de valor e mês que compõem o resultado
            let novoDebito = document.createElement('p'); //
            
            novaLinha.classList.add("linha-resultado");
            novoMes.textContent = i+1;
            novoDebito.textContent = Math.round(debito); // Arredonda o cálculo para um número inteiro (106.8463436 --> 107)

            novaLinha.appendChild(novoMes);
            novaLinha.appendChild(novoDebito);
            resultados.appendChild(novaLinha);
        }
        let textoDiferenca = document.createElement('p');
        textoDiferenca.textContent = "Diferença final: +"+ Math.round(Number(debito - debitoInicial))+"R$";
        textoDiferenca.classList.add('textoResultado');
        resultados.appendChild(textoDiferenca);
    })
}
