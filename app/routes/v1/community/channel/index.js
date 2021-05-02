const controller = require('../../../../controllers/community/channel.controller');
const auth = require('../../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// List
router.get('/', [auth], controller.show);

// Gravar
router.post('/', [auth], controller.store);

module.exports = router;