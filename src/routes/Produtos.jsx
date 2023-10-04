import { Link } from "react-router-dom";
//import { ListaProdutos } from "../Components/ListaProdutos";
import styles from "./Produtos.module.css";
import { AiFillEdit as Editar } from "react-icons/ai";
import { MdDeleteForever as Excluir } from "react-icons/md";
import { FaPlus as IconeAdicionar } from "react-icons/fa";
import { useEffect, useState } from "react";
import ModalAction from "../Components/ModalAction/ModalAction";

export default function Produtos() {
    document.title = "Lista de Produtos";

    const [produtos, setProdutos] = useState([{}]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);











    useEffect(()=>{

        if (!open) {
            carregarProdutos()
        }
    }, [open]);

    const handleUpdate = (id) => {
        setId(id);
        setOpen(true);
      };

      const handleadd = () => {
        setId(0);
        setOpen(true);
      };

const deletar = (id) => {
    fetch(`http://localhost:5000/produtos/${id}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        }
    })
    carregarProdutos();

    }


    const carregarProdutos = () => {
        fetch("http://localhost:5000/produtos",{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }})
            .then((response)=> response.json())
            .then((listaProdutos)=>{
                setProdutos(listaProdutos);
            })
    }


    return (
        <div>
            <h1>Produtos</h1>
            {open ? (
        <ModalAction
          open={open}
          setOpen={setOpen}
          idEditar={id}
          setId={setId}
        />
      ) : (
        ""
      )}
{/* <button onClick={()=> setOpen(true)}>Open - Modal</button> */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.tableHeader}>{"   "}Id{"   "}</th>
                        <th className={styles.tableHeader}>{"   "}Nome{"   "}</th>
                        <th className={styles.tableHeader}>{"   "}Preço{"   "}</th>
                        <th className={styles.tableHeader}>{"   "}Editar{"   "}</th>
                        <th className={styles.tableHeader}>{"   "}Excluir{"   "}</th>
                        {/* <th className={styles.tableHeader}>{"   "}Adicionar{"   "}</th> */}
  
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto, indice) => (
                        <tr className={styles.tableTr} key={indice}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.preco}</td>
                            <td style={{ textAlign: "center" }}>
                                <Link onClick={() => handleUpdate(produto.id)}>
                                <Editar />
                                </Link></td>
                            <td style={{ textAlign: "center" }}>
                                <Link onClick={() => {deletar(produto.id)}}>
                                <Excluir /></Link></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} style={{ textAlign: "center" }}>
                            PRODUTOS
                        </td>
                        <td colSpan={2} style={{ textAlign: "center" }} >
                            <Link onClick={()=> handleadd()}>
                                <IconeAdicionar />
                            </Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
