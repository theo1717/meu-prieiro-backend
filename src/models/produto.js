const {DataTypes} = require('sequelize');
const sequelize = require('../database/database');

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.REAL,
        allowNull: false
    }
}, {
    tableName: 'produtos',
    timestamps: false
});

module.exports = Produto;