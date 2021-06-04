const configExpress = require('./api/config/configExpress');
const config = require('config');
const instanciadb = require('./api/db');
require('dotenv').config();

(async () => {
    try {
        await instanciadb.sync()

        app = configExpress()
        app.listen(config.get('api.port'), () => {
            console.log('Servidor rodando!')
        });
    } catch (error) {
        throw error;
    };
    
})();


