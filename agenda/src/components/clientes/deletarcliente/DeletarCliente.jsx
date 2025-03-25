import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, deletar } from "../../../service/Service";
import { RotatingLines } from "react-loader-spinner";

function DeletarCliente() {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    async function buscarPorId(id) {
        try {
            await buscar(`/cliente/${id}`, setCliente);
        } catch (error) {
            console.error("Erro ao buscar cliente:", error);
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    async function deletarCliente() {
        setIsLoading(true);

        try {
            await deletar(`/cliente/${id}`);
            alert('Cliente apagado com sucesso');
        } catch (error) {
            alert('Erro ao deletar o cliente.');
            console.error("Erro ao deletar cliente:", error);
        }

        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate("/cliente/listar");
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar cliente</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o cliente a seguir?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Cliente
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{cliente.nomeCliente}</p>
                <div className="flex">
                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarCliente}>
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                        ) : (
                            <span>Sim</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarCliente;