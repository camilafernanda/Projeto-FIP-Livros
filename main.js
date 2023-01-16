let tituloLivro;
let capaLivro;
let statusLeitura;
let tabela;
let qtdPaginas;
let totalPaginas = [];
let vetorPaginasLidas = [];
let vetorPaginasNaoLidas = [];

function extraiValoresAoCarregarAPágina() {
    tituloLivro = document.querySelector('#titulo');
    capaLivro = document.querySelector('#capa_livro');
    statusLeitura = document.querySelector('#status');
    tabela = document.querySelector('#tabela_livros');
    qtdPaginas = document.querySelector('#qtd_paginas');
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
        //cellLivroNaoLido.innerHTML = tituloLivro.value + botaoDelete;

        vetorPaginasNaoLidas.push(Number(qtdPaginas.value));
    } 

    contaPaginas();

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

function deletaLivroLido(livroAdeletar) {
    livroAdeletar.parentElement.remove();
    //vetorPaginasLidas.pop;
    paginas = contaPaginas();
    paginasLidas = paginas[0];
    for(let i=0; i<vetorPaginasLidas.length; i++) {
        paginasLidas -= vetorPaginasLidas[i];
    }
    console.log(paginasLidas);
    console.log(vetorPaginasLidas);
}

function deletaLivroNaoLido(livroAdeletar) {
    livroAdeletar.parentElement.remove();
    //vetorPaginasNaoLidas.pop;
    //contaPaginas();
    for(let i=0; i<vetorPaginasNaoLidas.length; i++) {
        paginasNaoLidas -= vetorPaginasNaoLidas[i];
    }
    //console.log(paginasNaoLidas);
    //console.log(vetorPaginasNaoLidas);
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

    return [paginasLidas, paginasNaoLidas];
}

function montarTabelaResumo(paginasLidas, paginasNaoLidas, percentConclusao) {
    let elementoPaginasLidas = document.querySelector('#paginas_lidas');
    elementoPaginasLidas.textContent = paginasLidas + " páginas";

    let elementoPaginasNaoLidas = document.querySelector('#paginas_desejadas');
    elementoPaginasNaoLidas.textContent = paginasNaoLidas + " páginas";

    let elementoPercentConclusao = document.querySelector('#porcentagem_conclusao');
    elementoPercentConclusao.textContent = parseFloat(percentConclusao.toFixed(2)) + '%';
}