const controller = require('../../../controllers/producer_user/producer.controller');
const auth = require('../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// Registrar
router.post('/register', [auth], controller.store);

module.exports = router;