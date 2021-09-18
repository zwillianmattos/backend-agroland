const controller = require('../../../../controllers/education/ebook/ebook.controller');
const auth = require('../../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();

// Listar Todos
router.get('/', [],  controller.show);

// Save ebook rate 
router.post('/:ebook/rate', [auth],  controller.rate);

module.exports = router;