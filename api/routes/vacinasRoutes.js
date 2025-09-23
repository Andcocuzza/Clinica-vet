const express = require('express');
const router = express.Router();
const vacinasController = require('../controller/vacinasController');

router.get('/', vacinasController.getAll);
router.get('/:id', vacinasController.getById);
router.post('/', vacinasController.create);
router.put('/:id', vacinasController.update);
router.delete('/:id', vacinasController.remove);

module.exports = router;