const router = require('express').Router();

router.get('/agendamentos', (req, resp) => {
    resp.send('OK');
});

module.exports = router