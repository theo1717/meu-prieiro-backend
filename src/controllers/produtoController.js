const { parse } = require('dotenv');
const Produto = require('../models/produto');

exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos.', error });
    }
};

let produtos = [
    { id: 1, nome: 'Tecaldo mecânico', preco: 450.00 },
    { id: 2, nome: 'Mouse Gamer', preco: 150.00 },
    { id: 3, nome: 'Monitor UltraWide', preco: 1200.00 },
];

let nextId = 4;

exports.listarTodos = (req, res) => {   
    res.json(produtos);
}

exports.createProduto = async (req, res) => {
    const { nome, preco } = req.body;
    if (!nome || preco === undefined) {
        return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }
    try {
        const novoProduto = await Produto.create({ nome, preco });
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto.', error });
    }
};

exports.updateProduto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;

    if (!nome && preco === undefined) {
        return res.status(400).json({ message: 'Pelo menos um dos campos (nome ou preço) deve ser fornecido para atualização.' });
    }
    try {
        const [updated] = await Produto.update(
            { nome, preco },
            { where: { id: id } }
        );
        if (updated) {
            const produtoAtualizado = await Produto.findByPk(id);
            res.json(produtoAtualizado);
        } else {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto.', error });
    }
};


exports.deleteProduto = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await Produto.destroy({ where: { id: id } });
        
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto.', error });
    }
};
    