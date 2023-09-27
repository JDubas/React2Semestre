// AdicionarProdutos.jsx

import { useState , useEffect } from 'react'; // Adicionar hook de efeito
import { useNavigate , useParams} from 'react-router-dom'; // adicionar o hook para usar os parametros da url
import { ListaProdutos } from '../Components/ListaProdutos';

export default function AdicionarProdutos() {
    // Código adicional para incluir a parte de trazer os dados do produto ao add um novo
    // id fornecido na URL (editar/produtos/:id). 
    // Produtos novos vem com id = novo
    const { id } = useParams();
    // Inicializando o estado do produto
    const [produto, setProduto] = useState({
        id: "",
        nome: "",
        preco: "",
    });

    // Se um id é encontrado na URL, então buscamos na lista de produtos e atualizamos o produto
    // que será exibido no formulário
    useEffect(() => {
        // Verifica se na URL do adicionar rodutos veio um id
        if (id) {
            // Busca o produto na lista de produtos pelo id. Usa parseInt p usar operador compara.
            const produtoRecuperado = ListaProdutos.find(
                (produto) => produto.id === parseInt(id)
            );
            // Se o produto é encontrado, 
            // então o estado do produto local é atualizado com os dados do produto recuperado,
            // usando setProduto
            if (produtoRecuperado) {
                setProduto({
                    nome: produtoRecuperado.nome,
                    preco: produtoRecuperado.preco,
                });
            }
        }
    }, [id]);// garante que o useEffect seja usado sempre que o id for alterado

    // Código normal para adicionar produtos
    document.title = 'Adicionar Produto';

    // Inicializando o useNavigate
    const navigate = useNavigate();

    // Atualiza o estado local do produto com os dados do formulário
    const handleChangeProduto = (event) => {
        const { name, value } = event.target;
        setProduto({ ...produto, [name]: value }); //... é o spread operator
    };

    // Função chamada quando o botão de adicionar é clicado
    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Somente atribua um novo ID se não estiver definido já
        if (!produto.id) {
            produto.id = ListaProdutos[ListaProdutos.length - 1].id + 1;
        }
    
        // Adicionando o novo produto à lista
        ListaProdutos.push(produto);
        
        alert('Produto adicionado com sucesso!');
        navigate('/produtos');
    };

    // Renderiza o formulário para adicionar produto com nome e preço
    return (
        <>  {/* Fragmento. Como um container invisível */}
            <div> 
                <h1>Adicionar Produto</h1>
                <div>{/* Ao clicar no botão, a função é chamada. Aqui tb definimos o form.*/}
                    <form onSubmit={handleSubmit}>
                        <fieldset> {/* Agrupa elementos do form */}
                            <legend>Novo Produto</legend>
                            <div>
                                <label htmlFor="idNome">Nome:</label>
                                {/* Campos do nome. Qq alteração chama a função handleChangeProduto*/}
                                <input
                                    type="text"
                                    name="nome"
                                    id="idNome"
                                    onChange={handleChangeProduto}
                                    // Valor do campo nome inicialmente do estado local
                                    value={produto.nome} 
                                />
                            </div>
                            <div>
                                <label htmlFor="idPreco">Preço:</label>
                                <input
                                    type="number"
                                    name="preco"
                                    id="idPreco"
                                    onChange={handleChangeProduto}
                                    value={produto.preco}
                                />
                            </div>
                            <div>
                                <button>ADICIONAR</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                {/* Aqui exibimos em tempo real o que é digitado*/}
                <p>Nome : {produto.nome}</p>
                <p>Preço : {produto.preco}</p>
            </div>
        </>
    );
}
