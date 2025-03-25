import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import CardClientes from "../cardclientes/CardClientes";
import { buscar } from "../../../service/Service";

function ListaClientes() {
    const [clientes, setClientes] = useState([]);

    async function buscarCliente() {
        try {
            await buscar("/cliente/listar", setClientes);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    }

    useEffect(() => {
        buscarCliente();
    }, []);

    return (
        <>
            {clientes.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="bg-[#f4f4f4] flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {clientes.map((cliente) => (
                            <CardClientes key={cliente.id} cliente={cliente} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaClientes;