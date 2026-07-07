// ======================================
// SmartCupom
// Estratégia Completa V0.4
// ======================================


function calcularEstrategiaCompleta(lista){


    let produtosRestantes = [...lista];


    let compras = [];


    let economiaTotal = 0;



    while(produtosRestantes.length > 0){



        let melhorCompra = null;



        for(let tamanho = 1; tamanho <=3; tamanho++){



            let grupos =
            gerarCombinacoes(
                produtosRestantes,
                tamanho
            );



            grupos.forEach(grupo=>{


                let resultado =
                melhorCupomCompra(grupo);



                if(resultado.cupom){


                    if(
                    !melhorCompra ||
                    resultado.desconto >
                    melhorCompra.desconto
                    ){


                        melhorCompra = {

                            produtos: grupo,

                            total:
                            resultado.total,

                            cupom:
                            resultado.cupom,

                            desconto:
                            resultado.desconto

                        };


                    }


                }


            });


        }



        if(!melhorCompra){


            break;


        }



        compras.push(melhorCompra);



        economiaTotal +=
        melhorCompra.desconto;



        const idsUsados =
        melhorCompra.produtos.map(
            p=>p.id
        );



        produtosRestantes =
        produtosRestantes.filter(
            p=>!idsUsados.includes(p.id)
        );



    }




    return {

        compras,

        economiaTotal

    };


}
