const router = require('express').Router();
const servicoUsuario = require('../services/usuarios');
const passport = require('passport');

router.get('/usuarios',
    passport.authenticate('bearer', {session: false}),
    servicoUsuario.carregarTodosUsuarios
);

router.post('/usuarios',
    passport.authenticate('bearer', {session: false}),
    servicoUsuario.criarUsuario
);

router.get('/usuarios/:id',
    passport.authenticate('bearer', {session: false}),
    servicoUsuario.carregarUsuario
);

router.delete('/usuarios/:id',
    passport.authenticate('bearer', {session: false}),
    servicoUsuario.delete
);

router.put('/usuarios/:id', 
    passport.authenticate('bearer', {session: false}),
    servicoUsuario.alterarUsuario
);

module.exports = router;