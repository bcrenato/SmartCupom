// ===============================
// SmartCupom - Versão 0.1
// Controle principal
// ===============================


// Dados locais

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let cupons = JSON.parse(localStorage.getItem("cupons")) || [];



// ===============================
// Navegação entre telas
// ===============================

const botoesMenu = document.querySelectorAll("nav button");

const paginas = document.querySelectorAll(".pagina");


botoesMenu.forEach(botao => {

    botao.addEventListener("click", () => {


        const paginaSelecionada = botao.dataset.page;


        paginas.forEach(pagina => {

            pagina.classList.add("oculto");

        });


        document
        .getElementById(paginaSelecionada)
        .classList.remove("oculto");


    });

});



// ===============================
// Atualizar Dashboard
// ===============================

function atualizarDashboard(){


    document.getElementById("totalProdutos").textContent =
    produtos.length;


    document.getElementById("totalCupons").textContent =
    cupons.length;


}



atualizarDashboard();



// ===============================
// Tema escuro (preparação)
// ===============================

const btnTema = document.getElementById("btnTema");


btnTema.addEventListener("click",()=>{


    document.body.classList.toggle("escuro");


    if(document.body.classList.contains("escuro")){

        btnTema.textContent="☀️";

    }else{

        btnTema.textContent="🌙";

    }


});



// ===============================
// Funções de armazenamento
// ===============================


function salvarProdutos(){

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}



function salvarCupons(){

    localStorage.setItem(
        "cupons",
        JSON.stringify(cupons)
    );

}



// ===============================
// Produtos
// (estrutura inicial)
// ===============================


function adicionarProduto(produto){


    produtos.push(produto);

    salvarProdutos();

    atualizarDashboard();


}



// ===============================
// Cupons
// (estrutura inicial)
// ===============================


function adicionarCupom(cupom){


    cupons.push(cupom);

    salvarCupons();

    atualizarDashboard();


}



// ===============================
// Teste inicial
// ===============================


console.log("SmartCupom iniciado");

console.log("Produtos:", produtos);

console.log("Cupons:", cupons);
