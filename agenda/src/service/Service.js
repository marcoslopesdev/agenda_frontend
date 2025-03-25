import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const buscar = async (url, setDados) => {
    try {
        const resposta = await api.get(url);
        setDados(resposta.data);
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
};

export const cadastrar = async (url, dados, setDados) => {
    try {
        const resposta = await api.post(url, dados);
        setDados(resposta.data);
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
    }
};

export const atualizar = async (url, dados, setDados, header) => {
    try {
        const resposta = await api.put(url, dados, header);
        setDados(resposta.data);
    } catch (error) {
        console.error("Erro ao atualizar:", error);
    }
};

export const deletar = async (url, header) => {
    try {
        await api.delete(url, header);
    } catch (error) {
        console.error("Erro ao deletar:", error);
    }
};