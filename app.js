const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para processar requisições com corpo em JSON.
// Isso faz com que 'req.body' esteja disponível com o JSON parseado.
app.use(express.json());


let produtos = [
    { id: 1, nome: 'Tecaldo mecânico', preco: 450.00 },
    { id: 2, nome: 'Mouse Gamer', preco: 150.00 },
    { id: 3, nome: 'Monitor UltraWide', preco: 1200.00 },
];

let nextId = 4; // Começa com o próximo ID disponível

app.get('/', (req, res) => {
    res.send('Olá, mundo! Este é meu primeiro backend com Express.');
});

app.get('/sobre', (req, res) => {
    res.send('Esta é a página sobre mim. Estou aprendendo backend com Express!');
});

app.get('/api/produtos', (req, res) => {   
    // res.json() envia um objeto ou array
    res.json(produtos);
});

// Rota POST para criar um novo produto.
app.post('/api/produtos', (req, res) => {
    // O corpo da requisição (JSON) é acessado via req.body.
    const { nome, preco } = req.body;
  
    // Validação simples: verifica se nome e preco foram fornecidos.
    if (!nome || preco === undefined) {
      return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }
  
    const novoProduto = {
      id: nextId++, // Atribui um novo ID e incrementa nextId
      nome,        // Equivale a nome: nome
      preco        // Equivale a preco: preco
    };
  
    produtos.push(novoProduto); // Adiciona o novo produto ao array
  
    // Retorna o produto criado com status 201 (Created).
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
  
      // Validação simples: Pelo menos um campo deve ser fornecido.
      if (!nome && preco === undefined) { // Permite que preco seja 0
        return res.status(400).json({ message: 'Pelo menos um campo (nome ou preco) deve ser fornecido para atualização.' });
      }
  
      // Atualiza o produto existente no array.
      // Usamos o spread operator (...) para manter as propriedades existentes
      // e sobrescrever apenas as que foram fornecidas no req.body.
      produtos[produtoIndex] = {
        ...produtos[produtoIndex], // Mantém o ID e outras propriedades se não forem fornecidas
        nome: nome !== undefined ? nome : produtos[produtoIndex].nome, // Atualiza nome se fornecido
        preco: preco !== undefined ? preco : produtos[produtoIndex].preco // Atualiza preco se fornecido
      };
  
      // Retorna o produto atualizado.
      res.json(produtos[produtoIndex]);
    } else {
      // Se não encontrou, retorna 404 (Not Found).
      res.status(404).json({ message: 'Produto não encontrado para atualização.' });
    }
  });

  // Rota DELETE para excluir um produto por ID.
app.delete('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = produtos.length; // Guarda o tamanho original do array
  
    // Filtra o array, removendo o produto com o ID especificado.
    produtos = produtos.filter(p => p.id !== id);
  
    // Verifica se a quantidade de produtos diminuiu (se um produto foi removido).
    if (produtos.length < initialLength) {
      // Se o produto foi removido, retorna status 204 (No Content).
      res.status(204).send(); // send() sem corpo para 204
    } else {
      // Se o produto não foi encontrado para exclusão, retorna 404.
      res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
    }
  });
  
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Para parar o servidor, pressione Ctrl + C no terminal');
});