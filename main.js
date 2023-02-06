let tituloLivro;
let autorLivro;
let capaLivro;
let paginasLidas;
let totalPaginas;

let livrosLidos;
let livrosNaoLidos;

let todosOsLivros = [];
let lido;

function extraiValoresAoCarregarAPagina() {
    tituloLivro = document.querySelector('#titulo');
    autorLivro = document.querySelector('#autor');
    capaLivro = document.querySelector('#capa_livro');
    paginasLidas = document.querySelector('#paginas_lidas');
    totalPaginas = document.querySelector('#total_paginas');

    livrosLidos = document.querySelector("#lista_livros_lidos");
    livrosNaoLidos = document.querySelector("#lista_livros_nao_lidos");
}

function adicionaLivro() {

    let livro = criaLivro();
    todosOsLivros.push(livro);

    console.log(todosOsLivros);

    if (livro.lido == true) {
        adicionaLivroNaLista(livro, livrosLidos);
    } else {
        adicionaLivroNaLista(livro, livrosNaoLidos);
    }

    contaPaginas();
    event.preventDefault();

}

function criaLivro() {

    if (totalPaginas.value == paginasLidas.value) {
        lido = true;
    } else {
        lido = false;
    }

    let livro = {
        titulo: tituloLivro.value,
        autor: autorLivro.value,
        capa: capaLivro.value,
        paginas: totalPaginas.value,
        paginasLidas: paginasLidas.value,
        lido: lido
    }
    return livro;
}

function adicionaLivroNaLista(livro, lista) {

    let elementoArticle = document.createElement("article");
    let elementoImagem = document.createElement("img");
    let elementoTitulo = document.createElement("h1");
    let elementoAutor = document.createElement("p");
    let elementoBotaoDelete = document.createElement("button");

    elementoImagem.src = livro.capa;
    elementoTitulo.innerText = livro.titulo;
    elementoAutor.innerText = livro.autor;
    elementoBotaoDelete.innerText = "Deletar";

    elementoArticle.appendChild(elementoImagem);
    elementoArticle.appendChild(elementoTitulo);
    elementoArticle.appendChild(elementoAutor);
    elementoArticle.appendChild(elementoBotaoDelete);

    if (!livro.lido) {
        let inputLeitura = document.createElement("input");
        inputLeitura.type = "range";
        inputLeitura.min = livro.paginaAtual;
        inputLeitura.max = livro.paginas;
        elementoArticle.appendChild(inputLeitura);
    }

    lista.appendChild(elementoArticle);

}

function contaPaginas() {

    let totalPaginasTodosLivros = 0;
    let totalPaginasLidas = 0;
    let totalPaginasNaoLidas = 0;
    let porcentagem = 0;

    for (let i = 0; i < todosOsLivros.length; i++) {
        totalPaginasTodosLivros += Number(todosOsLivros[i].paginas);
        totalPaginasLidas += Number(todosOsLivros[i].paginasLidas);
        totalPaginasNaoLidas = Number(totalPaginasTodosLivros - totalPaginasLidas);
    }

    porcentagem = (totalPaginasLidas * 100) / totalPaginasTodosLivros;

    montarTabelaResumo(totalPaginasLidas, totalPaginasNaoLidas, porcentagem);

}

function montarTabelaResumo(totalPaginasLidas, paginasFaltantes, porcentagem) {
    let elementoTotalPaginasLidas = document.querySelector("#total_paginas_lidas");
    elementoTotalPaginasLidas.innerHTML = totalPaginasLidas;

    let elementoPaginasFaltantes = document.querySelector("#paginas_faltantes");
    elementoPaginasFaltantes.innerHTML = paginasFaltantes;

    let elementoPorcentagem = document.querySelector("#campo_porcentagem");
    elementoPorcentagem.innerHTML = porcentagem.toFixed(2) + "%";
}

// function marcarComoLido(inputLeitura, livro) {
    
//     inputLeitura.addEventListener('change', function (evento) {
//         paginaAtual = evento.target.value;
//         if (paginasAtual == totalPaginas) {
//             livro.lido = true;
//         }
//     })
//     return inputLeitura;
// }



// function exibeMetaDiaria() {
//     let metaDiaria = parseInt(Math.random() * maxMeta.value);

//     let newpopupWindow = window.open('', 'pagina', "width=250 height=250");
//     newpopupWindow.document.write("Que bom que você voltou! Hoje sua meta de leitura é de " + metaDiaria + " páginas");
// }

// function contaTempo() {
//     var now = new Date();
//     var msAteDezHoras = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
//     if (msAteDezHoras < 0) {
//         msAteDezHoras += 86400000; // já passou das 10 da manhã, começa de novo.
//     }
//     setTimeout(function () { exibeMetaDiaria() }, msAteDezHoras);
// }