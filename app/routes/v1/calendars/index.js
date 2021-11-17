const controller = require('../../../controllers/calendars/calendars.controller');
const express = require('express');
const router = express.Router();

// Adicionar eventos
router.post('/novo', [], controller.create);

// Ver evento
router.get('/:calendarId', [], controller.get);

// Ver todos eventos
router.get('/', [], controller.getAll);


// Editar eventos
router.put('/:calendarId', [], controller.update);

// Deletar eventos
router.delete('/:calendarId', [], controller.delete);

module.exports = router;