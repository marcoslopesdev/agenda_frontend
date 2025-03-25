import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, cadastrar, atualizar } from "../../../service/Service";

function FormularioCliente() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [cliente, setCliente] = useState({
        nomeCliente: "",
        cpf: "",
        dataNascimento: "",
        endereco: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function buscarPorId(id) {
        try {
            await buscar(`/cliente/${id}`, setCliente);
        } catch (error) {
            console.error("Erro ao buscar cliente:", error);
        }
    }

    useEffect(() => {
        if (id) {
            buscarPorId(id);
        }
    }, [id]);

    function atualizarEstado(e) {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        });
    }

    function retornar() {
        navigate("/cliente/listar");
    }

    function validarFormulario() {
        const newErrors = {};

        if (!cliente.nomeCliente.trim()) {
            newErrors.nomeCliente = "O nome é obrigatório.";
        } else if (cliente.nomeCliente.length < 3) {
            newErrors.nomeCliente = "O nome deve ter pelo menos 3 caracteres.";
        }

        if (!cliente.cpf.trim()) {
            newErrors.cpf = "O CPF é obrigatório.";
        } else if (!/^\d{11}$/.test(cliente.cpf)) {
            newErrors.cpf = "O CPF deve conter 11 dígitos numéricos.";
        }

        if (!cliente.dataNascimento) {
            newErrors.dataNascimento = "A data de nascimento é obrigatória.";
        } else {
            const hoje = new Date();
            const dataNasc = new Date(cliente.dataNascimento);
            const idade = hoje.getFullYear() - dataNasc.getFullYear();

            if (
                idade < 18 ||
                (idade === 18 &&
                    (hoje.getMonth() < dataNasc.getMonth() ||
                        (hoje.getMonth() === dataNasc.getMonth() &&
                            hoje.getDate() < dataNasc.getDate())))
            ) {
                newErrors.dataNascimento =
                    "O cliente deve ter pelo menos 18 anos.";
            }
        }

        if (!cliente.endereco.trim()) {
            newErrors.endereco = "O endereço é obrigatório.";
        } else if (cliente.endereco.length < 5) {
            newErrors.endereco = "O endereço deve ter pelo menos 5 caracteres.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function gerarNovoCliente(e) {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        setIsLoading(true);

        try {
            if (id) {
                await atualizar("/cliente/atualizar", cliente, setCliente);
                alert("O cliente foi atualizado com sucesso!");
            } else {
                await cadastrar("/cliente/cadastrar", cliente, setCliente);
                alert("O cliente foi cadastrado com sucesso!");
            }
            retornar();
        } catch (error) {
            console.error("Erro ao salvar o cliente:", error);
            alert("Erro ao salvar o cliente.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto bg-[#f4f4f4]">
            <div className="clienteForm">
                <h1 className="text-4xl text-center my-8">
                    {id ? "Editar Cliente" : "Cadastrar Cliente"}
                </h1>

                <form className="flex flex-col gap-4" onSubmit={gerarNovoCliente}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nomeCliente">Nome</label>
                        <input
                            type="text"
                            placeholder="Nome do cliente"
                            name="nomeCliente"
                            className="border-2 border-slate-700 rounded p-2"
                            value={cliente.nomeCliente}
                            onChange={atualizarEstado}
                        />
                        {errors.nomeCliente && (
                            <span className="text-red-500">{errors.nomeCliente}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            placeholder="CPF do cliente (somente números)"
                            name="cpf"
                            className="border-2 border-slate-700 rounded p-2"
                            value={cliente.cpf}
                            onChange={atualizarEstado}
                        />
                        {errors.cpf && (
                            <span className="text-red-500">{errors.cpf}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            name="dataNascimento"
                            className="border-2 border-slate-700 rounded p-2"
                            value={cliente.dataNascimento}
                            onChange={atualizarEstado}
                        />
                        {errors.dataNascimento && (
                            <span className="text-red-500">{errors.dataNascimento}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="endereco">Endereço</label>
                        <input
                            type="text"
                            placeholder="Endereço do cliente"
                            name="endereco"
                            className="border-2 border-slate-700 rounded p-2"
                            value={cliente.endereco}
                            onChange={atualizarEstado}
                        />
                        {errors.endereco && (
                            <span className="text-red-500">{errors.endereco}</span>
                        )}
                    </div>

                    <button
                        className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                        type="submit"
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
                            <span>{id ? "Atualizar" : "Cadastrar"}</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormularioCliente;