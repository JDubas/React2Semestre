import { useNavigate, useParams } from "react-router-dom";
import { ListaProdutos } from "../Components/ListaProdutos";
import { useState } from "react";

export default function EditarProdutos() {

  document.title = "Editar Produtos";

  //usando o hook useParams para recuperar o id da rota
  const {id} = useParams();
  const navigate = useNavigate();

//   const produtoRecuperadoPorId = ListaProdutos.filter((produto)=>{
//     if(produto.id == parseInt(id)){
//             return produto;
//         }
//       });

    const produtoRecuperadoPorId = ListaProdutos.filter(item => item.id == id)[0];
  
    const [produto, setProduto] = useState({
        id: produtoRecuperadoPorId.id,
        nome: produtoRecuperadoPorId.nome,
        preco: produtoRecuperadoPorId.preco
    });

    const handleChangeProduto = (event) => {

       const {name,value} = event.target;
    
       setProduto({...produto,[name]:value});
    
    }

     const handleSubmit = (event) =>{
        event.preventDefault();
    
        let indice;
        //Recuperar o indice do produto alterado com indexOf
        indice = ListaProdutos.findIndex((item)=> item.id === produto.id);
        
        ListaProdutos.splice(indice,1,produto);
        alert("Produto alterado com sucesso!");
    
        //Realizando o redirect.
        navigate("/produtos");
      }

  return (
    <>


    <div>
        <h1>Editar Produtos</h1>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Produdo Selecionado: </legend>
                <div>
                    <input type="hidden" name="id"/>
                </div>
                <div>
                    <label htmlFor="idNome">Nome: </label>
                    <input type="text" name="nome" id="idNome" onChange={handleChangeProduto} value={produto.nome}/>
                </div>
                <div>
                    <label htmlFor="idPreco">Preco: </label>
                    <input type="number" name="preco" id="idPreco" onChange={handleChangeProduto} value={produto.preco}/>
                </div>
                <div>
                    <button>Editar</button>
                </div>
                                
            </fieldset>
        </form>

        <p>Nome : {produto.nome}</p>
        <p>Preco : {produto.preco}</p>
    </div>
    </>


  )
}
