const controller = require('../../../controllers/cultures/cultures.controller');
const auth = require('../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// Lista todas
router.get('/', [], controller.show);

// Lista dados cultura
router.get('/:culture', [], controller.view);

// Lista dados cultura
router.get('/:culture/:category/detail', [], controller.detail);

module.exports = router;