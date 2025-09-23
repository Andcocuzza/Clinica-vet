const express = require('express');
const router = express.Router();
const historicoController = require('../controller/historicoController');

router.get('/', historicoController.getAll);
router.get('/:id', historicoController.getById);
router.post('/', historicoController.create);
router.put('/:id', historicoController.update);
router.delete('/:id', historicoController.remove);

module.exports = router;