const express = require('express');
const router = express.Router();
const examesController = require('../controller/examesController');

router.get('/', examesController.getAll);
router.get('/:id', examesController.getById);
router.post('/', examesController.create);
router.put('/:id', examesController.update);
router.delete('/:id', examesController.remove);

module.exports = router;