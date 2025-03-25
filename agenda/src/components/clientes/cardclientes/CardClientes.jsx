import { Link } from 'react-router-dom';

function CardClientes({ cliente }) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-[#2f7ddf] text-white font-bold text-2xl'>
                {cliente.nomeCliente}
            </header>

            <div className="p-8 text-xl bg-slate-200 h-full">
                <p><strong>CPF:</strong> {cliente.cpf}</p>
                <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento}</p>
                <p><strong>Endereço:</strong> {cliente.endereco}</p>
            </div>

            <div className="flex">
                <Link to={`/cliente/atualizar/${cliente.id}`}
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                    flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/cliente/deletar/${cliente.id}`}
                    className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center py-2'>
                    <button>Deletar</button>
                </Link>

                <Link to={`/cliente/contatos/${cliente.id}`}
                    className="text-slate-100 bg-blue-400 hover:bg-blue-700 w-full 
                    flex items-center justify-center py-2">
                    <button>Ver Contatos</button>
                </Link>
            </div>
        </div>
    );
}

export default CardClientes;