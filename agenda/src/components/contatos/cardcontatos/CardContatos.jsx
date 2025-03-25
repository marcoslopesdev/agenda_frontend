import { Link } from 'react-router-dom';

function CardContato({ contato }) {
    return (
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
    );
}

export default CardContato;