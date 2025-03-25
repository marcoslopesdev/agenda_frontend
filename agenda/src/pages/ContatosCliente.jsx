import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api = axios.create({
    baseURL: "http://localhost:8080"
});

function ContatosCliente() {
    const { id } = useParams();
    const [contatos, setContatos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/contato/cliente/${id}`)
            .then((response) => {
                setContatos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar os contatos:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div className="container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {contatos.map((contato) => (
                            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                                <div>
                                    <div className='p-4'>
                                        <h4 className='text-lg font-semibold uppercase'>Tipo: {contato.tipo}</h4>
                                        <p><strong>Valor:</strong> {contato.valor}</p>
                                        <p><strong>Observação:</strong> {contato.observacao ? contato.observacao : 'Sem observação'}</p>
                                        <p><strong>Cliente:</strong> {contato.cliente?.nomeCliente}</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Link to={`/contato/atualizar/${contato.id}`}
                                        className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                                        flex items-center justify-center py-2'>
                                        <button>Editar</button>
                                    </Link>
                                    <Link to={`/contato/deletar/${contato.id}`} 
                                        className='text-white bg-red-400 
                                        hover:bg-red-700 w-full flex items-center justify-center'>
                                        <button>Deletar</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        

    );
}

export default ContatosCliente;