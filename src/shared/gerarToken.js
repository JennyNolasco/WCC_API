const jwt = require('jsonwebtoken');


function criarToken(usuario) {
    const payload = {
        id: usuario.id
    };

    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '2m'});
}

module.exports = criarToken
