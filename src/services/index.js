const Agendamento = require('./Agendamento');
const SequelizeAgendamentos = require('../models/SequelizeAgendamentos');

module.exports = {
    carregarTodosAgendamentos: async(req, resp) => {
        try {
            const results = await SequelizeAgendamentos.listar();
            resp.status(201).send(JSON.stringify(results));
        } catch (error) {
            resp.status(401).send(JSON.stringify(error))
        }
    },

    carregarAgendamento: async(req, resp) => {
        try {
            const id = req.params.id;
            const agendamento = new Agendamento({id: id});
            await agendamento.buscar();
            resp.status(201).send(JSON.stringify(agendamento))
        } catch (error) {
            resp.status(401).send(JSON.stringify(error))
        }
    },

    criarAgendamento: async(req, resp) => {
        try {
            const reqAgendamento = req.body;
            const agendamento = new Agendamento(reqAgendamento);
            await agendamento.criar()
            resp.status(201).send(JSON.stringify(agendamento))
        } catch (error) {
            resp.status(401).send(JSON.stringify(error))
        }
    }
}