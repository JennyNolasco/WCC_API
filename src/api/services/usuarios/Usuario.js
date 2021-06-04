const CampoInvalido = require('../../errors/CampoInvalido');
const CampoQtdMaxima = require('../../errors/CampoQtdMaxima');
const CampoQtdMinima = require('../../errors/CampoQtdMinima');
const DadosNaoInformados = require('../../errors/DadosNaoInformados');
const SequelizeUsuario = require('../../repositories/usuariosSequelize');
const bcrypt = require('bcrypt');

class Usuario {
    constructor({
        id, nome, email, senha, data_criacao, data_atualizacao
    }) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.data_criacao = data_criacao;
        this.data_atualizacao = data_atualizacao;
        this.senhaHash = '';
    };

    async criar() {
        this.validar();
        await this.adicionarSenha()
        const result = await SequelizeUsuario.adicionar({
            nome: this.nome,
            email: this.email,
            senha: this.senhaHash
        });

        this.id = result.id;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    };

    async buscarPorId() {
        const result = await SequelizeUsuario.buscarPorPK(this.id);
        this.nome = result.nome;
        this.email = result.email;
        this.senha = result.senha;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao
    };

    async buscarPorEmail() {
        const result= await SequelizeUsuario.buscarPorEmail(this.email);
        this.id = result.id;
        this.nome = result.nome;
        this.senha= result.senha;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    };

    async atualizar() {
        await SequelizeUsuario.buscarPorPK(this.id);
        const camposAtualizaveis = ['nome', 'email', 'senha'];
        const dadosAtualizar = {};

        camposAtualizaveis.forEach(async (campo) => {
            const valor = this[campo];
            if (typeof valor === 'string' && valor.length > 0) {
                dadosAtualizar[campo] = valor
            }
        }); 

        
        if(Object.keys(dadosAtualizar).length === 0) {
            throw new DadosNaoInformados();
        }

        await SequelizeUsuario.atualizar(this.id, dadosAtualizar);
    };

    async remover() {
        await SequelizeUsuario.remover(this.id);
    };


    validar() {
        const camposObrigatorios = ['nome', 'email', 'senha'];

        camposObrigatorios.forEach((campo) => {
            const valor = this[campo];

            if(typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo);
            }

            if(valor.length < 8 && campo === 'senha') {
                throw new CampoQtdMinima(campo);
            };
    
            if(valor.length > 64 && campo === 'senha') {
                throw new CampoQtdMaxima(campo);
            };
        });
    }

    async gerarHash(campo) {
        const saltRounds = 12;
        return await bcrypt.hash(campo, saltRounds);
    }

    async adicionarSenha() {
        this.senhaHash = await this.gerarHash(this.senha);
    }
}

module.exports = Usuario;