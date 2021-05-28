class FormatoInvalido extends Error {
    constructor(contentType) {
        const mensagem = `O tipo ${contentType} é inválido`;
        super(mensagem);
        this.name = 'FormatoInvalido';
        this.idError = 6;
    }
}

module.exports = FormatoInvalido;