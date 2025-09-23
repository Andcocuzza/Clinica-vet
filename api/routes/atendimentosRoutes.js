const express = require('express');
const router = express.Router();
const atendimentosController = require('../controller/atendimentosController');

router.get('/', atendimentosController.getAll);
router.get('/:id', atendimentosController.getById);
router.post('/', atendimentosController.create);
router.put('/:id', atendimentosController.update);
router.delete('/:id', atendimentosController.remove);

module.exports = router;