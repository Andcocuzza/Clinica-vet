const express = require('express');
const router = express.Router();
const tutoresController = require('../controller/tutoresController');

router.get('/', tutoresController.getAll);
router.get('/:id', tutoresController.getById);
router.post('/', tutoresController.create);
router.put('/:id', tutoresController.update);
router.delete('/:id', tutoresController.remove);

module.exports = router;