const Agendamento = require('./Agendamento');
const SequelizeAgendamentos = require('../../models/agendamentos/SequelizeAgendamentos');
const SerializarAgendamento = require('../../shared/Serializar').SerializarAgendamento;

module.exports = {
    carregarTodosAgendamentos: async(req, resp, next) => {
        try {
            const results = await SequelizeAgendamentos.listar();
            const serializador = new SerializarAgendamento(
                resp.getHeader('Content-Type'),
                ['status']
            );
            resp.status(201).send(serializador.transformar(results));
        } catch (error) {
            next(error)
        }
    },

    carregarAgendamento: async(req, resp, next) => {
        try {
            const id = req.params.id;
            const agendamento = new Agendamento({id: id});
            await agendamento.buscar();
            const serializador = new SerializarAgendamento(
               resp.getHeader('Content-Type') 
            )
            resp.status(201).send(serializador.transformar(agendamento))
        } catch (error) {
            next(error)
        }
    },

    criarAgendamento: async(req, resp, next) => {
        try {
            const reqAgendamento = req.body;
            const agendamento = new Agendamento(reqAgendamento);
            await agendamento.criar()
            const serializador = new SerializarAgendamento(
                resp.getHeader('Content-Type')
            );
            resp.status(201).send(serializador.transformar(agendamento));
        } catch (error) {
            next(error)
        }
    },

    deletarAgendamento: async(req, resp, next) => {
        try {
            const id = req.params.id;
            const agendamento = new Agendamento({id: id});
            await agendamento.remover()
            const serializador = new SerializarAgendamento(
                resp.getHeader('Content-Type')
            );
            resp.status(200).send(serializador.transformar(
                    {message:`Agendamento: ${id} removido com sucesso`}
                )
            );
        } catch (error) {
            next(error)
        }
    },

    alterarAgendamento: async(req, resp, next) => {
        try {
            const id = req.params.id;
            const dadosBody = req.body;
            const dados = Object.assign({}, dadosBody, {id:id})
            const agendamento = new Agendamento(dados);
            await agendamento.atualizar();
            const serializador = new SerializarAgendamento(
                resp.getHeader('Content-Type')
            );
            resp.status(201).send(serializador.transformar(agendamento));
        } catch (error) {   
            next(error);
        }
    }
}