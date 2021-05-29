const express = require('express');
const routesAgendamento = require('../api');
const FormatosValidos = require('../shared/Serializar').FormatosValidos;
const SerializarErro = require('../shared/Serializar').SerializarErro;

module.exports = () => {
    const app = express();

    app.use((req, resp, next) => {
        let formatoSolicitado = req.header('Accept');
        if(formatoSolicitado === '*/*') {
            formatoSolicitado = 'application/json';
        }

        if(FormatosValidos.indexOf(formatoSolicitado) === -1) {
            resp.status(406);
            resp.end();
            return
        }

        resp.setHeader('Content-Type', formatoSolicitado);
        next()
    });

    app.use(express.json());
    app.use('/api', routesAgendamento);


    app.use((error, req, resp, next) => {
        let status = 500;

        serializarErro = new SerializarErro(
           resp.getHeader('Content-Type') 
        );

        if(error instanceof NaoEncontrado) {
            status = 404;
        };

        if(error instanceof CampoInvalido || error instanceof CampoQtdMaxima 
            || error instanceof CampoQtdMinima) {
            status = 400;
        };

        if(error instanceof FormatoInvalido) {
            status = 406;
        };

        resp.status(status).send(
            serializarErro.transformar({
                id: error.idError,
                mensagem: error.message
            })
        );
    })

    return app
}