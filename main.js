let tituloLivro;
let capaLivro;
let statusLeitura;
let tabela;
let qtdPaginas;
let paginaAtual;
let maxMeta;
let totalPaginas = [];
let vetorPaginasLidas = [];
let vetorPaginasNaoLidas = [];

function extraiValoresAoCarregarAPagina() {
    tituloLivro = document.querySelector('#titulo');
    capaLivro = document.querySelector('#capa_livro');
    statusLeitura = document.querySelector('#status');
    tabela = document.querySelector('#tabela_livros');
    qtdPaginas = document.querySelector('#qtd_paginas');
    maxMeta = document.querySelector('#meta_max');
}

function adicionaLivro() {
    
    let linha = tabela.insertRow();
    let cellLivroLido = linha.insertCell();
    let cellLivroNaoLido = linha.insertCell(1);

    let novoLivro = new Image(100, 200);
    novoLivro.src = capaLivro.value;

    // let novoLivro = "<img src=" + capaLivro.value + ">" + "<br>" + tituloLivro.value;
    elementoDiv = criaDiv(tituloLivro);
    botaoDelete = criaBotaoDelete(cellLivroLido, cellLivroNaoLido, statusLeitura);
    botaoLido = criaBotaoLido(novoLivro, cellLivroLido, cellLivroNaoLido, elementoDiv, botaoDelete);
    
    if (statusLeitura.value == 'sim') {
        cellLivroLido.appendChild(novoLivro);
        cellLivroLido.append(elementoDiv);
        cellLivroLido.appendChild(botaoDelete);
        //cellLivroLido.innerHTML = tituloLivro.value + botaoDelete;

        vetorPaginasLidas.push(Number(qtdPaginas.value));
    } else {
        cellLivroNaoLido.appendChild(novoLivro);
        cellLivroNaoLido.append(elementoDiv);
        cellLivroNaoLido.appendChild(botaoDelete);
        cellLivroNaoLido.appendChild(botaoLido);
        cellLivroNaoLido.append(elementoDiv);
        cellLivroNaoLido.appendChild(criaInputPaginas());
        //cellLivroNaoLido.innerHTML = tituloLivro.value + botaoDelete;

        vetorPaginasNaoLidas.push(Number(qtdPaginas.value));
    } 
    
    exibeMetaDiaria();
    contaPaginas();

}



function exibeMetaDiaria() {
    let metaDiaria = parseInt(Math.random() * maxMeta.value);

    let newpopupWindow = window.open ('', 'pagina', "width=250 height=250");
    newpopupWindow.document.write ("Que bom que você voltou! Hoje sua meta de leitura é de " + metaDiaria + " páginas");
}

function contaTempo() {
    var now = new Date();
    var msAteDezHoras = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
    if (msAteDezHoras < 0) {
        msAteDezHoras += 86400000; // já passou das 10 da manhã, começa de novo.
    }
    setTimeout(function(){exibeMetaDiaria()}, msAteDezHoras);
}

function criaDiv(tituloLivro) {
    let elementoDiv = document.createElement("div");
    elementoDiv.id = "div_titulo";
    elementoDiv.innerHTML = tituloLivro.value; 
    return elementoDiv;
}

function criaBotaoDelete(cellLivroLido, cellLivroNaoLido, statusLeitura) {
    // let botaoDelete = "<br><button onclick='deletaLivroLido(this)'>Delete</button>";
    // return botaoDelete;

    let botaoDelete = document.createElement("button");
    botaoDelete.id = "delete";
    botaoDelete.innerHTML = "Delete";
    botaoDelete.addEventListener('click', function() {
        if (statusLeitura.value == 'sim') {
            cellLivroLido.remove();
            deletaLivroLido(this);
        } else {
            cellLivroNaoLido.remove();
            deletaLivroNaoLido(this);
        }
    });
    return botaoDelete;
}

function criaBotaoLido(novoLivro, cellLivroLido, cellLivroNaoLido, elementoDiv, botaoDelete) {
    let botaoLido = document.createElement("button");
    botaoLido.id = "lido";
    botaoLido.innerHTML = "Lido";
    botaoLido.addEventListener('click', function() {
        marcarComoLido(novoLivro, cellLivroLido, elementoDiv, botaoDelete);
        cellLivroNaoLido.remove();
        });
    return botaoLido;
}

function criaInputPaginas() {
    let inputPaginas = document.createElement("input");
    inputPaginas.id = "input_paginas";
    inputPaginas.type = "range";
    inputPaginas.min = "0";
    inputPaginas.max = qtdPaginas.value;
    inputPaginas.addEventListener('change', function(evento){
        paginaAtual = evento.target.value;
        console.log(paginaAtual);
    })
    return inputPaginas;
}

function deletaLivroLido(livroAdeletar) {
    livroAdeletar.parentElement.remove();
    vetorPaginasLidas.pop;
    contaPaginas();
    // paginas = contaPaginas();
    // paginasLidas = paginas[0];
    // for(let i=0; i<vetorPaginasLidas.length; i++) {
    //     paginasLidas -= vetorPaginasLidas[i];
    // }
    // console.log(paginasLidas);
    console.log(vetorPaginasLidas);
}

function deletaLivroNaoLido(livroAdeletar) {
    livroAdeletar.parentElement.remove();
    vetorPaginasNaoLidas.pop;
    contaPaginas();
    // for(let i=0; i<vetorPaginasNaoLidas.length; i++) {
    //     paginasNaoLidas -= vetorPaginasNaoLidas[i];
    // }
    // console.log(paginasNaoLidas);
    console.log(vetorPaginasNaoLidas);
}

function marcarComoLido(novoLivro, cellLivroLido, elementoDiv, botaoDelete) {
    cellLivroLido.appendChild(novoLivro);
    cellLivroLido.append(elementoDiv);
    cellLivroLido.appendChild(botaoDelete);
}

function contaPaginas() {
    
    let paginasLidas = 0;
    let paginasNaoLidas = 0;
    let valorTotalPaginas = 0;
    totalPaginas.push(Number(qtdPaginas.value));
    
    
    for(let i=0; i<vetorPaginasLidas.length; i++) {
        paginasLidas += vetorPaginasLidas[i];
    }

    for(let i=0; i<vetorPaginasNaoLidas.length; i++) {
        paginasNaoLidas += vetorPaginasNaoLidas[i];
    }

    valorTotalPaginas =  paginasNaoLidas + paginasLidas;

    let percentConclusao = 0;
    percentConclusao = (paginasLidas / valorTotalPaginas)*100;
    
    montarTabelaResumo(paginasLidas, paginasNaoLidas, percentConclusao);

    //return [paginasLidas, paginasNaoLidas];
}

function montarTabelaResumo(paginasLidas, paginasNaoLidas, percentConclusao) {
    let elementoPaginasLidas = document.querySelector('#paginas_lidas');
    elementoPaginasLidas.textContent = paginasLidas + " páginas";

    let elementoPaginasNaoLidas = document.querySelector('#paginas_desejadas');
    elementoPaginasNaoLidas.textContent = paginasNaoLidas + " páginas";

    let elementoPercentConclusao = document.querySelector('#porcentagem_conclusao');
    elementoPercentConclusao.textContent = parseFloat(percentConclusao.toFixed(2)) + '%';
}