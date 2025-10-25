let produtos = [
    { id: 1, nome: 'Tecaldo mecânico', preco: 450.00 },
    { id: 2, nome: 'Mouse Gamer', preco: 150.00 },
    { id: 3, nome: 'Monitor UltraWide', preco: 1200.00 },
];

let nextId = 4;

exports.listarTodos = (req, res) => {   
    res.json(produtos);
}

exports.buscarporId = (req, res) => {
 
    const idproduto = parseInt(req.params.id);
    const produtoEncontrado = produtos.find(p => p.id === idproduto);

    if (produtoEncontrado) {
        res.json(produtoEncontrado);
    } else {
        res.status(404).json({ message: 'Produto não encontrado.' });
    }
}

exports.criar = (req, res) => {
    const { nome, preco } = req.body;
  
    if (!nome || preco === undefined) {
      return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }
    const novoProduto = {id: nextId++, nome, preco};
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
}

exports.atualizar = (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === id);
  
    if (produtoIndex !== -1) {
      const { nome, preco } = req.body;
      produtos[produtoIndex] = {
        ...produtos[produtoIndex],
        nome: nome !== undefined ? nome : produtos[produtoIndex].nome,}
        res.json(produtos[produtoIndex]);
    } else {
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
};

exports.deletar = (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = produtos.length;
    produtos = produtos.filter(p => p.id !== id);
    if (produtos.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Produto não encontrado.' });
    }
};
    