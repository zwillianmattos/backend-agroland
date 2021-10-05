const threadController = require('../../../../controllers/community/thread.controller');
const repliesController = require('../../../../controllers/community/replies.controller');

const auth = require('../../../../middlewares/authentication/auth.user');
const express = require('express');
const router = express.Router();


// List
router.get('/',  threadController.showAll);

// Gravar
router.post('/', [auth], threadController.store);

// Lista Thread
router.get('/:channel/:thread',  threadController.show);

// Like Thread
router.post('/:channel/:thread/like', [auth], threadController.like);


// Remove Thread
router.delete('/:channel/:thread', [auth], threadController.delete);

// Update Thread
router.put('/:channel/:thread', [auth], threadController.update);

// Lista comentarios da Thread
router.post('/:channel/:thread/replies', [auth], repliesController.store);

// Remover comentario da thread
router.delete('/:channel/:thread/:replie', [auth], repliesController.delete);

// Gravar Replies
router.post('/:channel/:thread/replies', [auth], repliesController.store);

// Update Replies
router.put('/:channel/:thread/replies/:id', [auth], repliesController.update);

module.exports = router;
