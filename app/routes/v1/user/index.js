const userController = require('../../../controllers/user/user.controller');
const auth = require('../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// Registrar
router.post('/register', userController.register);
// Login
router.post('/login', userController.login);
// Activation
router.get('/resendActivation/:email', userController.reSendEmailConfirmation);
router.post('/activation', userController.activation);
// Recovery Account
router.get('/accountRecovery/:id', userController.sendAccountRecovery);
// Atualizar perfil
router.put('/profile', [auth], userController.store);
// Profile
router.get('/profile', [auth], userController.current);
// Remove Account
router.delete('/:id', [auth], userController.deleteAccount);


module.exports = router;