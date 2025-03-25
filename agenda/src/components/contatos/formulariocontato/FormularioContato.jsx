import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, atualizar, cadastrar } from "../../../service/Service";
import { RotatingLines } from "react-loader-spinner";

function FormularioContato() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState({ id: 0, nomeCliente: '' });
    const [contato, setContato] = useState({ tipo: '', valor: '', observacao: '', cliente: {} });

    const [errors, setErrors] = useState({
        tipo: '',
        valor: '',
        observacao: '',
        cliente: ''
    });

    async function buscarContatoPorId(id) {
        try {
            await buscar(`/contato/${id}`, setContato);
        } catch (error) {
            console.error("Erro ao buscar contato:", error);
        }
    }

    async function buscarClientes() {
        try {
            await buscar("/cliente/listar", setClientes);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    }

    useEffect(() => {
        buscarClientes();
        if (id) {
            buscarContatoPorId(id);
        }
    }, [id]);

    useEffect(() => {
        if (contato.cliente?.id) {
            setCliente(contato.cliente);
        }
    }, [contato]);

    function atualizarEstado(e) {
        setContato({
            ...contato,
            [e.target.name]: e.target.value,
        });
    }

    function retornar() {
        navigate('/contato/listar');
    }

    function validarFormulario() {
        const newErrors = { tipo: '', valor: '', observacao: '', cliente: '' };
        let isValid = true;

        if (!contato.tipo.trim() || contato.tipo.length < 3 || contato.tipo.length > 50) {
            newErrors.tipo = 'O tipo de contato deve conter entre 3 e 50 caracteres.';
            isValid = false;
        }

        if (!contato.valor.trim() || contato.valor.length < 5 || contato.valor.length > 100) {
            newErrors.valor = 'O valor do contato deve conter entre 5 e 100 caracteres.';
            isValid = false;
        }

        if (contato.observacao && contato.observacao.length > 255) {
            newErrors.observacao = 'A observação deve conter no máximo 255 caracteres.';
            isValid = false;
        }

        if (!cliente.id) {
            newErrors.cliente = 'O cliente deve ser selecionado.';
            isValid = false;
        } else {
            contato.cliente = { id: cliente.id, nomeCliente: cliente.nomeCliente };
        }

        setErrors(newErrors);
        return isValid;
    }

    async function gerarNovoContato(e) {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        setIsLoading(true);

        try {
            if (id) {
                await atualizar(`/contato/atualizar`, contato, setContato);
                alert('Contato atualizado com sucesso');
            } else {
                await cadastrar(`/contato/cadastrar`, contato, setContato);
                alert('Contato cadastrado com sucesso');
            }
            retornar();
        } catch (error) {
            alert('Erro ao salvar o contato');
            console.error("Erro:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const carregandoCliente = cliente.nomeCliente === '';

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f4f4f4]">
            <div className="contatoForm bg-white p-8 rounded shadow-lg w-full max-w-lg">
                <h1 className="text-4xl text-center my-8">
                    {id ? 'Editar Contato' : 'Cadastrar Contato'}
                </h1>

                <form onSubmit={gerarNovoContato}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tipo">Tipo de Contato</label>
                        <input
                            type="text"
                            placeholder="Ex: Celular, Email, WhatsApp..."
                            name="tipo"
                            className="border-2 border-slate-700 rounded p-2"
                            value={contato.tipo}
                            onChange={atualizarEstado}
                        />
                        {errors.tipo && <span className="text-red-500 text-sm">{errors.tipo}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="valor">Valor do Contato</label>
                        <input
                            type="text"
                            placeholder="Ex: (11) 99999-9999 ou email@email.com"
                            name="valor"
                            className="border-2 border-slate-700 rounded p-2"
                            value={contato.valor}
                            onChange={atualizarEstado}
                        />
                        {errors.valor && <span className="text-red-500 text-sm">{errors.valor}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="observacao">Observação</label>
                        <textarea
                            placeholder="Adicione uma observação (opcional)"
                            name="observacao"
                            className="border-2 border-slate-700 rounded p-2"
                            value={contato.observacao}
                            onChange={atualizarEstado}
                        />
                        {errors.observacao && <span className="text-red-500 text-sm">{errors.observacao}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p>Nome do Cliente</p>
                        <select
                            name="cliente"
                            id="cliente"
                            className="border p-2 border-slate-800 rounded"
                            value={cliente.id || ''}
                            onChange={(e) => {
                                const selectedCliente = clientes.find(c => c.id === parseInt(e.target.value));
                                setCliente(selectedCliente);
                            }}
                        >
                            <option value="" disabled>Selecione um Cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nomeCliente}
                                </option>
                            ))}
                        </select>
                        {errors.cliente && <span className="text-red-500 text-sm">{errors.cliente}</span>}
                    </div>

                    <button
                        type="submit"
                        className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
                        disabled={carregandoCliente}
                    >
                        {isLoading ? 
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>{id ? 'Atualizar' : 'Cadastrar'}</span>
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormularioContato;