const TabelaAgendamento = require('./TabelaAgendamento');

module.exports = {
    async listar() {
        try {
            return await TabelaAgendamento.findAll({
                raw: true,
            });
        } catch (error) {
            throw error
        }
    }
};