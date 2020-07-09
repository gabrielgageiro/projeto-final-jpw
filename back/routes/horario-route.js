var express = require('express');
var router = express.Router();
var controller = require('../data/horario-controller')

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.save);
router.delete('/:id', controller.delete);

module.exports = router;