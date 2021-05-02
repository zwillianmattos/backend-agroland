const threadController = require('../../../../controllers/community/thread.controller');
const repliesController = require('../../../../controllers/community/replies.controller');
const auth = require('../../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// List
router.get('/', [auth], threadController.show);

// Gravar
router.post('/', [auth], threadController.store);

// Lista Thread
router.get('/:channel/:thread', [auth], threadController.show);

// Lista Thread
router.post('/:channel/:thread/replies', [auth], repliesController.store);

// Remove Thread
router.delete('/:channel/:thread', [auth], threadController.delete);

module.exports = router;