function adicionaLivro() {
    let tituloLivro = document.querySelector('#titulo').value;
    let capaLivro = document.querySelector('#capa_livro').value;
    let statusLeitura = document.querySelector('#status').value;
  
    let tabela = document.querySelector('#tabela_livros');
    let linha = tabela.insertRow();
    let cellLivroLido = linha.insertCell();
    let cellLivroNaoLido = linha.insertCell(1);
    let novoLivro = "<img src=" + capaLivro + ">" + "<br>" + tituloLivro;
 
    if (statusLeitura == 'sim') {
        cellLivroLido.innerHTML = novoLivro +
        "<br><button style='visual.css' onclick='deletaLivro(this)'>Delete</button>";
    } else {
        cellLivroNaoLido.innerHTML = novoLivro +
        "<br> <button style='visual.css' onclick='deletaLivro(this)'>Delete</button> <button style='visual.css' id='lido'>Lido</button>";
    } 

    let botaoLido = document.getElementById('lido');
    botaoLido.addEventListener('click', () => {
        marcarComoLido(novoLivro, cellLivroLido)
        cellLivroNaoLido.remove();
    })

    contaPaginas(statusLeitura);

}

function deletaLivro(livroAdeletar) {
    livroAdeletar.parentElement.remove();
}

function marcarComoLido(novoLivro, cellLivroLido) {
    cellLivroLido.innerHTML = novoLivro +
        "<br><button style='visual.css' onclick='deletaLivro(this)'>Delete</button>";
}

function contaPaginas(statusLeitura) {
    // let qtdPaginas = document.querySelector('#qtd_paginas').value;

    // let totalPaginas = [];
    // let vetorPaginasLidas = [];
    // let vetorPaginasNaoLidas = [];

    // totalPaginas.push(qtdPaginas);
    // paginasLidas = 0;
    // paginasNaoLidas = 0;

    // for(let i=0; i<totalPaginas.length; i++) {
    //     if(statusLeitura == 'sim') {
    //         vetorPaginasNaoLidas[i] = 0;
    //         vetorPaginasLidas.push(qtdPaginas);
    //         paginasLidas += vetorPaginasLidas[i];
         
    //     } else {
    //         vetorPaginasLidas[i] = 0;
    //         vetorPaginasNaoLidas.push(qtdPaginas);
    //         paginasNaoLidas += vetorPaginasNaoLidas[i];           
    //     }
    // }
    // montarTabelaResumo(paginasLidas, paginasNaoLidas);
}

function montarTabelaResumo(paginasLidas, paginasNaoLidas) {
    // let elementoPaginasLidas = document.querySelector('#paginas_lidas');
    // elementoPaginasLidas.textContent = paginasLidas;

    // let elementoPaginasNaoLidas = document.querySelector('#paginas_desejadas');
    // elementoPaginasNaoLidas.textContent = paginasNaoLidas;

    // let percentConclusao = document.querySelector('#porcentagem_conclusao');
    // resumoTotalMontante.textContent = percentConclusao + '%';
}