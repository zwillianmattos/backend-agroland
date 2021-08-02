const controller = require('../../../../controllers/cultures/cultures.controller');
const auth = require('../../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// Lista todas
router.get('/cultures', [auth], controller.show);

// Lista dados cultura
router.get('/cultures/:culture', [auth], controller.show);

// Gravar
router.post('/cultures', [auth], controller.store);

// Update
router.put('/cultures:/culture', [auth], controller.store);

// Remove cultura
router.delete('cultures/:culture', [auth], controller.delete);

module.exports = router;