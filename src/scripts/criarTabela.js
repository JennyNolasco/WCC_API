const TabelaSequelize = require('../models/TabelaAgendamento');

TabelaSequelize.sync()
    .then(()=> {
        console.log('Tabela criada')
    })
    .catch((error) => {
        console.log(error)
    });