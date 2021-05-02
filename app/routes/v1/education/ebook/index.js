const controller = require('../../../../controllers/education/ebook/ebook.controller');
const auth = require('../../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();

// Listar Todos
router.get('/', [auth],  controller.show);

module.exports = router;