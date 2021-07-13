const controller = require('../../../controllers/producer_user/producer.controller');
const auth = require('../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// Registrar
router.post('/register', [auth], controller.register);
// Atualizar perfil
router.put('/profile', [auth], controller.store);
// Profile
router.get('/profile', [auth], controller.current);
// Remove Procucer account
router.delete('/:id', [auth], controller.deleteAccount);

module.exports = router;