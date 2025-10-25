const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sua_chave_secreta_aqui'; // Em produção, use uma variável de ambiente

exports.verificaToken = (req, res, next) => { 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded; 
        next(); 
    } catch (error) { 
        res.status(403).json({ message: 'Token inválido.' });
    }
};
