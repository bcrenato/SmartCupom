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
// Cadastro de Cupons
// ===============================


const btnAdicionarCupom =
document.getElementById("btnAdicionarCupom");



btnAdicionarCupom.addEventListener("click",()=>{


    const cupom = {


        id: Date.now(),


        nome:
        document.getElementById("nomeCupom").value,


        percentual:
        Number(
        document.getElementById("percentualCupom").value
        ),


        descontoMaximo:
        Number(
        document.getElementById("maximoCupom").value
        ),


        compraMinima:
        Number(
        document.getElementById("minimoCupom").value
        )


    };



    if(!cupom.nome || !cupom.percentual){

        alert("Informe nome e percentual");

        return;

    }



    cupons.push(cupom);


    salvarCupons();


    mostrarCupons();


    atualizarDashboard();


});




// ===============================
// Mostrar Cupons
// ===============================


function mostrarCupons(){


    const lista =
    document.getElementById("listaCupons");


    lista.innerHTML="";



    cupons.forEach(cupom=>{


        const div =
        document.createElement("div");


        div.className="card";



        div.innerHTML=`


        <h3>
        🎟 ${cupom.nome}
        </h3>


        <p>
        Desconto:
        ${cupom.percentual}%
        </p>


        <p>
        Máximo:
        R$ ${cupom.descontoMaximo.toFixed(2)}
        </p>


        <p>
        Compra mínima:
        R$ ${cupom.compraMinima.toFixed(2)}
        </p>



        <button onclick="removerCupom(${cupom.id})">
        🗑 Excluir
        </button>


        `;



        lista.appendChild(div);



    });


}



mostrarCupons();




// ===============================
// Excluir Cupom
// ===============================


function removerCupom(id){


    cupons =
    cupons.filter(
        cupom=>cupom.id !== id
    );


    salvarCupons();


    mostrarCupons();


    atualizarDashboard();


}


// ===============================
// Lista de Compras
// ===============================


let listaCompras =
JSON.parse(localStorage.getItem("listaCompras")) || [];




// Preencher produtos no seletor

function carregarProdutosLista(){


    const select =
    document.getElementById("produtoLista");


    if(!select) return;


    select.innerHTML =
    '<option value="">Selecione um produto</option>';



    produtos.forEach(produto=>{


        const option =
        document.createElement("option");


        option.value =
        produto.id;


        option.textContent =
        produto.nome +
        " - R$ " +
        produto.preco.toFixed(2);



        select.appendChild(option);


    });


}



carregarProdutosLista();





// Adicionar produto na lista


const btnAdicionarLista =
document.getElementById("btnAdicionarLista");



if(btnAdicionarLista){


btnAdicionarLista.addEventListener("click",()=>{


    const idProduto =
    Number(
    document.getElementById("produtoLista").value
    );



    const quantidade =
    Number(
    document.getElementById("quantidadeLista").value
    );



    const produto =
    produtos.find(
        p=>p.id === idProduto
    );



    if(!produto){

        alert("Selecione um produto");

        return;

    }



    listaCompras.push({

        id: produto.id,

        nome: produto.nome,

        preco: produto.preco,

        quantidade: quantidade

    });



    salvarLista();


    mostrarLista();



});


}




// Salvar lista


function salvarLista(){

localStorage.setItem(
"listaCompras",
JSON.stringify(listaCompras)
);

}




// Mostrar lista


function mostrarLista(){


const div =
document.getElementById("listaCompras");


if(!div) return;


div.innerHTML="";



listaCompras.forEach(item=>{


    const card =
    document.createElement("div");


    card.className="card";


    card.innerHTML=`

    <h3>${item.nome}</h3>

    <p>
    Quantidade:
    ${item.quantidade}
    </p>


    <p>
    Total:
    R$ ${(item.preco * item.quantidade).toFixed(2)}
    </p>


    <button onclick="removerDaLista(${item.id})">
    🗑 Remover
    </button>

    `;


    div.appendChild(card);



});


}




// Remover item


function removerDaLista(id){


listaCompras =
listaCompras.filter(
item=>item.id !== id
);


salvarLista();


mostrarLista();


}


mostrarLista();


// ===============================
// Simulação de Cupons - V0.2
// ===============================


const btnSimular =
document.getElementById("btnSimular");



if(btnSimular){


btnSimular.addEventListener("click",()=>{


    calcularMelhorCupom();


});


}




// ===============================
// Simulação Inteligente V0.3
// ===============================


function calcularMelhorCupom(){


    const resultado =
    document.getElementById("resultadoSimulacao");



    if(listaCompras.length === 0){


        resultado.innerHTML = `

        <div class="card">

        <h3>⚠️ Lista vazia</h3>

        <p>
        Adicione produtos antes de simular.
        </p>

        </div>

        `;


        return;

    }




    const estrategia =
calcularEstrategiaCompleta(listaCompras);



    if(estrategia.compras.length === 0){


        resultado.innerHTML = `

        <div class="card">

        Nenhuma estratégia encontrada.

        </div>

        `;


        return;


    }





    let html = `

    <div class="card">

    <h3>🏆 Melhor estratégia encontrada</h3>


    `;



    estrategia.compras.forEach((compra,index)=>{


        html += `

        <hr>

        <h3>
        Compra ${index+1}
        </h3>


        <ul>
        `;



        compra.produtos.forEach(produto=>{


            html += `

            <li>
            ${produto.nome}
            -
            R$ ${produto.preco.toFixed(2)}
            </li>

            `;


        });



        html += `

        </ul>


        <p>
        Total:
        R$ ${compra.total.toFixed(2)}
        </p>


        <p>
        Cupom:
        ${compra.cupom ?
        compra.cupom.nome :
        "Nenhum"}
        </p>



        `;


    });




    html += `


    <hr>


    <h2>

    💰 Economia:

    R$ ${estrategia.economia.toFixed(2)}

    </h2>


    </div>


    `;



    resultado.innerHTML = html;


}




// ===============================
// Teste inicial
// ===============================


console.log("SmartCupom iniciado");

console.log("Produtos:", produtos);

console.log("Cupons:", cupons);
