require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const express = require('express');
const app = express();
const PORTA = 3000;
const sequelize = require('./database/database');
const Produto = require('./models/produto');

// Middleware para interpretar JSON
app.use(express.json());


async function syncDarabase() {
  try {
    await sequelize.authenticate();
    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('Erro ao sincronizar modelos', error);
  }
}
syncDarabase();

// Importamos o nosso arquivo de rotas de produtos
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Usamos o roteador na nossa aplicação, definindo um prefixo
// Todas as rotas em 'produtoRoutes' terão '/api/produtos' antes
app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de Produtos funcionando!');
});

// Inicialização do servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});