const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  accountId: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.ENUM('income', 'expense'), allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Transaction;
