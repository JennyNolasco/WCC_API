const express = require('express');
const routesAgendamento = require('../api');

module.exports = () => {
    const app = express();

    app.use(express.json());
    app.use('/api', routesAgendamento);

    return app
}