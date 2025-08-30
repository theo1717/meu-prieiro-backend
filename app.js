const express = require('express');

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Para parar o servidor, pressione Ctrl + C no terminal');
});

app.get('/', (req, res) => {
    res.send('Olá, mundo! Este é meu primeiro backend com Express.');
});

app.get('/sobre', (req, res) => {
    res.send('Esta é a página sobre mim. Estou aprendendo backend com Express!');
});

const produtos = [
    { id: 1, nome: 'Tecaldo mecânico', preco: 450.00 },
    { id: 2, nome: 'Mouse Gamer', preco: 150.00 },
    { id: 3, nome: 'Monitor UltraWide', preco: 1200.00 },
];

app.get('/api/produtos', (req, res) => {   
    // res.json() envia um objeto ou array
    res.json(produtos);
}); 