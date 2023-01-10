let tituloLivro;
let capaLivro;
let statusLeitura;
let tabela;
let qtdPaginas;
let totalPaginas = [];
let vetorPaginasLidas = [];
let vetorPaginasNaoLidas = [];

function extraiValores() {
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

    // Aqui eu tentei fazer a imagem com o Image e o botão de delete com createElement tb, mas aí eu deveria usar 3 appendChild em uma célula da tabela e, pelo o que pesquisei, não tem como.
    // let novoLivro = new Image(100, 200);
    // novoLivro.src = capaLivro.value;
    let novoLivro = "<img src=" + capaLivro.value + ">" + "<br>" + tituloLivro.value;
 
    if (statusLeitura.value == 'sim') {
        cellLivroLido.innerHTML = novoLivro +
        "<br><button onclick='deletaLivro(this)'>Delete</button>";

        vetorPaginasLidas.push(Number(qtdPaginas.value));
    } else {
        let botaoLido = document.createElement("button");
        botaoLido.id = "lido";
        botaoLido.innerHTML = "Lido";
        cellLivroNaoLido.innerHTML = novoLivro +
        "<br> <button onclick='deletaLivro(this)'>Delete</button>";
        cellLivroNaoLido.appendChild(botaoLido); 

        botaoLido.addEventListener('click', () => {
        marcarComoLido(novoLivro, cellLivroLido)
        cellLivroNaoLido.remove();
        })

        vetorPaginasNaoLidas.push(Number(qtdPaginas.value));
    } 

    contaPaginas(vetorPaginasLidas, vetorPaginasNaoLidas);

}

function deletaLivro(livroAdeletar) {
    livroAdeletar.parentElement.remove();
    // Parei aqui: fazendo a contagem de páginas diminuir assim que algum livro for deletado
    console.log(totalPaginas);
}

function marcarComoLido(novoLivro, cellLivroLido) {
    cellLivroLido.innerHTML = novoLivro +
        "<br><button style='visual.css' onclick='deletaLivro(this)'>Delete</button>";
}

function contaPaginas(vetorPaginasLidas, vetorPaginasNaoLidas) {
    
    let paginasLidas = 0;
    let paginasNaoLidas = 0;
    

    for(let i=0; i<vetorPaginasLidas.length; i++) {
        paginasLidas += vetorPaginasLidas[i];
    }

    for(let i=0; i<vetorPaginasNaoLidas.length; i++) {
        paginasNaoLidas += vetorPaginasNaoLidas[i];
    }

    totalPaginas.push(Number(qtdPaginas.value));
    let valorTotalPaginas = 0;
    
    for(let i=0; i<totalPaginas.length; i++) {
        valorTotalPaginas += totalPaginas[i];
    } 

    let percentConclusao = 0;
    percentConclusao = (paginasLidas / valorTotalPaginas)*100;
    
    montarTabelaResumo(paginasLidas, paginasNaoLidas, percentConclusao);
}

function montarTabelaResumo(paginasLidas, paginasNaoLidas, percentConclusao) {
    let elementoPaginasLidas = document.querySelector('#paginas_lidas');
    elementoPaginasLidas.textContent = paginasLidas + " páginas";

    let elementoPaginasNaoLidas = document.querySelector('#paginas_desejadas');
    elementoPaginasNaoLidas.textContent = paginasNaoLidas + " páginas";

    let elementoPercentConclusao = document.querySelector('#porcentagem_conclusao');
    elementoPercentConclusao.textContent = percentConclusao + '%';
}