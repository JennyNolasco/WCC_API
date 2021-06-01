const Sequelize = require('sequelize');
const instanciadb = require('../../db');

const columns = {
    nome_cliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome_servico: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('agendado', 'cancelado'),
        allowNull: false
    },
    data_agendamento: {
        type: Sequelize.DATE,
        allowNull: false
    }
};

const sequelizeOptions = {
    freezeTableName: true,
    tableName: 'agendamentos',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao'
};

module.exports = instanciadb.define('agendamentos', columns, sequelizeOptions);