const controller = require('../../../../controllers/categories/categories.controller');
const auth = require('../../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// Lista todas
router.get('/categories', [auth], controller.show);

// Gravar
router.post('/categories', [auth], controller.store);

// Update
router.put('/categories:/category', [auth], controller.store);

// Remove cultura
router.delete('categories/:category', [auth], controller.delete);

module.exports = router;