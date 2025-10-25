const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sua_chave_secreta_aqui'; // Em produção, use uma variável de ambiente

const usuarios = [];

exports.criarUsuario = (req, res) => {
    const { nome, email, senha } = req.body;

    if (usuarios.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    const novoUsuario = { id: usuarios.length + 1, nome, email, senha: senhaCriptografada };

    usuarios.push(novoUsuario);

    const {senha: _, ...usuarioSemSenha} = novoUsuario;
    res.status(201).json(usuarioSemSenha);
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
        return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) {
        return res.status(400).json({ message: 'Credenciais inválidas.' }); 
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
         JWT_SECRET,
        { expiresIn: '1h' });

    res.status(200).json({ 
        message: 'Login bem-sucedido.',
        token: token 
    });
}

