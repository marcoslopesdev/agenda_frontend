import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CardContatos from "../cardcontatos/CardContatos";
import { buscar } from "../../../service/Service";
import { DNA } from "react-loader-spinner";

function ListaContatos() {
    const navigate = useNavigate();
    const [contatos, setContatos] = useState([]);

    async function buscarContatos() {
        try {
            await buscar('/contato/listar', setContatos);
        } catch (error) {
            console.error("Erro ao buscar contatos:", error);
        }
    }

    useEffect(() => {
        buscarContatos();
    }, []);

    return (
        <>
            {contatos.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div className="container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {contatos.map((contato) => (
                            <CardContatos key={contato.id} contato={contato} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaContatos;