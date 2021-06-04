const NaoEncontrado = require('../errors/NaoEncontrado');
const TabelaUsuario = require('../models/TabelaUsuario');

module.exports = {
    async listar() {
        try {
            results = await TabelaUsuario.findAll({
                raw: true,
            });
            return results;
        } catch (error) {
            throw error
        }
    },

    async adicionar(usuario) {
        try {
            result = await TabelaUsuario.create(usuario);
            return result;
        } catch (error) {
            throw error
        }
    },

    async buscarPorPK(id) {
        try {
            usuario = await TabelaUsuario.findByPk(id);

            if(!usuario) {
                throw new NaoEncontrado('Usuário');
            }

            return usuario;
        } catch (error) {
            throw error
        }
    },

    async buscarPorEmail(email) {
        try {
            usuario = await TabelaUsuario.findOne({
                where:{
                    email:email
                }
            });

            if(!usuario) {
                throw new NaoEncontrado('Usuário')
            }

            return usuario;
        } catch (error) {
            throw error
        }
    },

    async atualizar(id, dados){
        try {
            result = await TabelaUsuario.update(
                dados,
                {
                    where: {
                        id:id
                    }
                }
            )

            return result
        } catch (error) {
            throw error
        }
    },

    async remover(id) {
        try {
            result = await TabelaUsuario.destroy(
                {
                    where: {
                        id:id
                    }
                }
            );

            if(result === 0) {
                throw new NaoEncontrado('Usuário');
            }
            return result
        } catch (error) {
            throw error
        }
    }
};