const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'transaction_id'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'user_id'
    },
    field: 'user_id'
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
    field: 'type'
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      min: 0.01
    },
    field: 'amount'
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'description'
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'category'
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'date'
  }
}, {
  tableName: 'transactions',
  timestamps: true,
  underscored: true
});

module.exports = Transaction;