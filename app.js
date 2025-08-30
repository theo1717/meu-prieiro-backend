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