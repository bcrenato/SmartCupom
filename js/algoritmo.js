// =====================================
// SmartCupom
// Motor Inteligente - V0.3
// =====================================


// Calcula desconto de um cupom

function calcularDesconto(total, cupom) {


    if(total < cupom.compraMinima){

        return 0;

    }


    let desconto =
    total * (cupom.percentual / 100);


    if(desconto > cupom.descontoMaximo){

        desconto = cupom.descontoMaximo;

    }


    return desconto;

}



// Calcula melhor cupom para uma compra

function melhorCupomCompra(produtosCompra){


    let total = produtosCompra.reduce(
        (soma,item)=>
        soma + (item.preco * item.quantidade),
        0
    );


    let melhor = {

        cupom:null,

        desconto:0,

        total:total

    };



    cupons.forEach(cupom=>{


        let desconto =
        calcularDesconto(total,cupom);



        if(desconto > melhor.desconto){


            melhor.cupom = cupom;

            melhor.desconto = desconto;


        }


    });



    return melhor;

}



// Gera combinações de produtos

function gerarCombinacoes(lista, tamanho){


    let resultado=[];



    function combinar(inicio, atual){


        if(atual.length === tamanho){


            resultado.push([...atual]);

            return;

        }



        for(let i=inicio;i<lista.length;i++){


            combinar(
                i+1,
                [...atual,lista[i]]
            );


        }


    }



    combinar(0,[]);



    return resultado;

}



// Procura melhor estratégia

function encontrarMelhorEstrategia(){


    let melhorResultado = {


        economia:0,

        compras:[]

    };



    let combinacoes = [];



    // grupos de até 3 produtos

    for(let tamanho=1;tamanho<=3;tamanho++){


        combinacoes.push(
            ...gerarCombinacoes(
                listaCompras,
                tamanho
            )
        );


    }




    combinacoes.forEach(grupo=>{


        let resultado =
        melhorCupomCompra(grupo);



        if(resultado.desconto > melhorResultado.economia){



            melhorResultado = {


                economia:
                resultado.desconto,


                compras:[{

                    produtos:grupo,

                    cupom:resultado.cupom,

                    total:resultado.total

                }]


            };


        }


    });



    return melhorResultado;


}
