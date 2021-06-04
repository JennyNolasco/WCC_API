const Usuario = require('./Usuario');
const SequelizeUsuario = require('../../repositories/usuariosSequelize');
const SerializarUsuario = require('../../../shared/Serializar').SerializarUsuario;

module.exports = {
    delete: async (req, resp, next) => {
        try {
            const id = req.params.id;
            const usuario = new Usuario({id: id});
            await usuario.remover();
            const serializar = new SerializarUsuario(
                resp.getHeader('Content-Type')
            );
            resp.status(200).send(JSON.stringify(
                {message:`Usuário: ${id} removido com sucesso`}
            ));
        } catch (error) {
            next(error)
        }
    },

    carregarUsuario: async (req, resp, next) => {
        try {
            const id = req.params.id;
            const usuario = new Usuario({id:id});
            await usuario.buscarPorId();
            const serializar = new SerializarUsuario(
                resp.getHeader('Content-Type')
            );

            resp.status(201).send(serializar.transformar(usuario));
        } catch (error) {
            next(error)
        }
    },

    carregarTodosUsuarios: async (req, resp, next) => {
        try {
            const results = await SequelizeUsuario.listar();

            const serializar = new SerializarUsuario(
                resp.getHeader('Content-Type')
            );
            resp.status(201).send(serializar.transformar(results));
        } catch (error) {
            next(error);
        }
    },

    alterarUsuario: async (req, resp, next) => {
        try {
            const id = req.params.id;
            const dadosBody = req.body;
            const dados = Object.assign({}, dadosBody, {id:id});
            const usuario = new Usuario(dados);
            await usuario.atualizar();
            const serializar = new SerializarUsuario(
                resp.getHeader('Content-Type')
            );
            resp.status(202).send(serializar.transformar(usuario));
        } catch (error) {
            next(error);
        }
    },

    criarUsuario: async (req, resp, next) => {
        try {
            const dados = req.body;
            const usuario = new Usuario(dados);
            await usuario.criar();

            const serializar = new SerializarUsuario(
                resp.getHeader('Content-Type')
            );
            resp.status(201).send(serializar.transformar(usuario));
        } catch (error) {
            next(error);
        }
    }
}