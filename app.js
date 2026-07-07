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
// Cadastro de Produtos
// ===============================


const btnAdicionarProduto =
document.getElementById("btnAdicionarProduto");


btnAdicionarProduto.addEventListener("click",()=>{


    const produto = {


        id: Date.now(),


        nome:
        document.getElementById("nomeProduto").value,


        preco:
        Number(
        document.getElementById("precoProduto").value
        ),


        quantidade:
        Number(
        document.getElementById("quantidadeProduto").value
        ),


        categoria:
        document.getElementById("categoriaProduto").value


    };



    if(!produto.nome || !produto.preco){

        alert("Informe nome e preço");

        return;

    }



    produtos.push(produto);


    salvarProdutos();


    mostrarProdutos();


    atualizarDashboard();


});




// ===============================
// Mostrar produtos
// ===============================


function mostrarProdutos(){


    const lista =
    document.getElementById("listaProdutos");


    lista.innerHTML="";



    produtos.forEach(produto=>{


        const div =
        document.createElement("div");


        div.className="card";


        div.innerHTML=`

        <h3>${produto.nome}</h3>

        <p>
        💰 R$ ${produto.preco.toFixed(2)}
        </p>

        <p>
        Quantidade: ${produto.quantidade}
        </p>

        <p>
        Categoria: ${produto.categoria || "-"}
        </p>

        <button onclick="removerProduto(${produto.id})">
        🗑 Excluir
        </button>

        `;



        lista.appendChild(div);



    });



}



mostrarProdutos();




// ===============================
// Excluir Produto
// ===============================


function removerProduto(id){


    produtos =
    produtos.filter(
        produto=>produto.id !== id
    );


    salvarProdutos();


    mostrarProdutos();


    atualizarDashboard();


}

// ===============================
// Teste inicial
// ===============================


console.log("SmartCupom iniciado");

console.log("Produtos:", produtos);

console.log("Cupons:", cupons);
