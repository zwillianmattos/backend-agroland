const controller = require('../../../controllers/user/user.controller');
const auth = require('../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// Registrar
router.post('/register', controller.register);
// Login
router.post('/login', controller.login);

// Activation
router.get('/resendActivation/:email', controller.reSendEmailConfirmation);
router.post('/activation', controller.activation);
// Recovery Account
router.get('/accountRecovery/:id', controller.sendAccountRecovery);

// Atualizar perfil
router.put('/profile', [auth], controller.store);
router.get('/profile', [auth], controller.current);
// Remove Account
router.delete('/:id', [auth], controller.deleteAccount);


module.exports = router;