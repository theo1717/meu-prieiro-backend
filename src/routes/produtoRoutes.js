const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');// Rota GET para obter todos os produtos.

const { verificaToken } = require('../middlewares/authMiddleware');

router.get('/', produtoController.listarTodos);
router.get('/:id', produtoController.buscarporId);

router.post('/', verificaToken, produtoController.criar);
router.put('/:id', verificaToken, produtoController.atualizar);
router.delete('/:id', verificaToken, produtoController.deletar);

module.exports = router;

