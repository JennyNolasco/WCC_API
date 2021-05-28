class CampoQtdMinima extends Error {
    constructor(campo) {
        const mensagem = `O campo ${campo} não possui a quantidade mínima de 8 caracteres`;
        super(mensagem);
        this.name = 'CampoQtdMinima';
        this.idError = 3;
    }
}

module.exports = CampoQtdMinima;