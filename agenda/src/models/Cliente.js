class Cliente {
    constructor(id, nomeCliente, cpf, dataNascimento, endereco, contatos = []) {
        this.id = id;
        this.nomeCliente = nomeCliente;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.contatos = contatos;
    }
}

export default Cliente;