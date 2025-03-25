import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletar } from "../../../service/Service";
import { RotatingLines } from "react-loader-spinner";

function DeletarContato() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    async function deletarContato() {
        setIsLoading(true);

        try {
            await deletar(`/contato/${id}`);
            alert("Contato apagado com sucesso");
        } catch (error) {
            console.error("Erro ao deletar contato:", error);
            alert("Erro ao deletar contato.");
        }

        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate("/contato/listar");
    }

    return (
        <div className="container w-1/3 mx-auto">
            <h1 className="text-4xl text-center my-4">Deletar Contato</h1>

            <p className="text-center font-semibold mb-4">
                Você tem certeza de que deseja apagar o contato?
            </p>

            <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
                <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
                    Contato
                </header>
                <div className="flex">
                    <button
                        className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center"
                        onClick={deletarContato}
                    >
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

export default DeletarContato;