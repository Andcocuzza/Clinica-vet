const express = require('express');
const router = express.Router();
const servicosController = require('../controller/servicosController');

router.get('/', servicosController.getAll);
router.get('/:id', servicosController.getById);
router.post('/', servicosController.create);
router.put('/:id', servicosController.update);
router.delete('/:id', servicosController.remove);

module.exports = router;