const express = require('express');
const router = express.Router();

const controller = require('./controller');


router.post('/', controller.criarEquipamento);
router.get('/', controller.listarEquipamentos);
router.put('/:id', controller.atualizarEquipamento);
router.delete('/:id', controller.deletarEquipamento);

module.exports = router;