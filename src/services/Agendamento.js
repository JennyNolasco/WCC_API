const sequelizeAgendamento = require('../models/SequelizeAgendamentos');
const moment = require('moment');
const CampoInvalido = require('../errors/CampoInvalido');
const NaoEncontrado = require('../errors/NaoEncontrado');
const DadosNaoInformados = require('../errors/DadosNaoInformados');

class Agendamento {
    constructor({id, nome_cliente, nome_servico, status, data_agendamento, 
        data_criacao, data_atualizacao}) {
            this.id = id;
            this.nome_cliente = nome_cliente;
            this.nome_servico = nome_servico;
            this.status = status;
            this.data_agendamento = data_agendamento;
            this.data_criacao = data_criacao;
            this.data_atualizacao = data_atualizacao;
        };

    async criar() {
        this.validar();
        const result = await sequelizeAgendamento.adicionar({
            nome_cliente: this.nome_cliente,
            nome_servico: this.nome_servico,
            status: this.status,
            data_agendamento: this.data_agendamento
        });
        this.id = result.id;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    };

    async buscar(){
        const result = await sequelizeAgendamento.buscarPorPK(this.id);
        this.nome_cliente = result.nome_cliente;
        this.nome_servico = result.nome_servico;
        this.status = result.status;
        this.data_agendamento = result.data_agendamento;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    };

    async atualizar() {
        await sequelizeAgendamento.buscarPorPK(this.id);
        const camposAtualizaveis = ['nome_cliente', 'nome_servico', 'status', 'data_agendamento'];
        const dadosAtualizar = {};

        camposAtualizaveis.forEach((campo) => {
            const valor = this[campo];
            if( typeof valor === 'string' && valor.length > 0) {
                dadosAtualizar[campo] = valor
            }
        });

        if(Object.keys(dadosAtualizar).length === 0) {
            throw new DadosNaoInformados();
        };

        await sequelizeAgendamento.atualizar(this.id, dadosAtualizar);
    }

    validar() {
        const camposObrigatorios = ['nome_cliente', 'nome_servico', 'status', 'data_agendamento']
        const hoje = moment().format('YYYY-MM-DD');

        camposObrigatorios.forEach((campo)=>{
            const valor = this[campo];
            if(typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo);
            }
            if(campo == 'data_agendamento' && !moment(valor).isSameOrAfter(hoje)) {
                throw new Error('Data inválida');
            }
        });
    };

    async remover() {
        const result = await sequelizeAgendamento.remover(this.id);

        if(result == 0){
            throw new NaoEncontrado('Agendamento');
        }
    }
};

module.exports = Agendamento;