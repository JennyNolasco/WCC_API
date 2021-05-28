class DadosNaoInformados extends Error {
    constructor() {
        const mensagem = 'Dados não informados';
        super(mensagem);
        this.name = 'DadosNaoInformados';
        this.idError = 4;
    }
}

module.exports = DadosNaoInformados;