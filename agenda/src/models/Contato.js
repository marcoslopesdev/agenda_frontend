import Cliente from "./Cliente";

class Contato {
    constructor(id, tipo, valor, observacao, cliente) {
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
        this.observacao = observacao;
        this.cliente = cliente;
    }
}

export default Contato;