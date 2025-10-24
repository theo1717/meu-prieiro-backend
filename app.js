const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let produtos = [
    { id: 1, nome: 'Tecaldo mecânico', preco: 450.00 },
    { id: 2, nome: 'Mouse Gamer', preco: 150.00 },
    { id: 3, nome: 'Monitor UltraWide', preco: 1200.00 },
];

let nextId = 4;

app.get('/', (req, res) => {
    res.send('Olá, mundo! Este é meu primeiro backend com Express.');
});

app.get('/sobre', (req, res) => {
    res.send('Esta é a página sobre mim. Estou aprendendo backend com Express!');
});

app.get('/api/produtos', (req, res) => {   
    res.json(produtos);
});

// Rota POST para criar um novo produto.
app.post('/api/produtos', (req, res) => {
    const { nome, preco } = req.body;
  
    if (!nome || preco === undefined) {
      return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }
  
    const novoProduto = {
      id: nextId++, 
      nome,
      preco
    };
  
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
  });

  // Rota PUT para atualizar um produto existente por ID.
app.put('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Encontra o índice do produto no array.
    const produtoIndex = produtos.findIndex(p => p.id === id);
  
    // Verifica se o produto foi encontrado.
    if (produtoIndex !== -1) {
      const { nome, preco } = req.body;
  
      if (!nome && preco === undefined) {
        return res.status(400).json({ message: 'Pelo menos um campo (nome ou preco) deve ser fornecido para atualização.' });
      }
  
      produtos[produtoIndex] = {
        ...produtos[produtoIndex],
        nome: nome !== undefined ? nome : produtos[produtoIndex].nome,
        preco: preco !== undefined ? preco : produtos[produtoIndex].preco
      };
  
     
      res.json(produtos[produtoIndex]);
    } else {
      res.status(404).json({ message: 'Produto não encontrado para atualização.' });
    }
  });

  // Rota DELETE para excluir um produto por ID.
app.delete('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = produtos.length;
  
    produtos = produtos.filter(p => p.id !== id);

    if (produtos.length < initialLength) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
    }
  });
  
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Para parar o servidor, pressione Ctrl + C no terminal');
});