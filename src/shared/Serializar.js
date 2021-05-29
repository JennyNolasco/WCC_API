const FormatoInvalido = require('../errors/FormatoInvalido');

class Serializar {
    json(dados) {
        return JSON.stringify(dados);
    }

    transformar(dados) {
        if (this.contentType !== 'application/json') {
            throw new FormatoInvalido(this.contentType);
        }
        return this.json(dados);
    }
}

class SerializarAgendamento extends Serializar {
    constructor(contentType) {
        super();
        this.contentType = contentType;
    };
};

class SerializarErro extends Serializar {
    constructor(contentType) {
        super()
        this.contentType = contentType;
        this.camposPermitidos = [
            'id', 'mensagem'
        ]
    }
}

module.exports = {
    Serializar: Serializar,
    SerializarAgendamento: SerializarAgendamento,
    SerializarErro: SerializarErro,
    FormatosValidos: ['application/json']
}