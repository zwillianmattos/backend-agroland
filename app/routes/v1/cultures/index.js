const controller = require('../../../controllers/cultures/cultures.controller');
const auth = require('../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// Lista todas
router.get('/', [auth], controller.show);

// Lista dados cultura
router.get('/:culture', [auth], controller.view);

// Lista dados cultura
router.get('/:culture/:category/detail', [auth], controller.detail);

module.exports = router;