const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Budget = sequelize.define('Budget', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  limit: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  spent: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  period: { type: DataTypes.ENUM('monthly', 'yearly'), defaultValue: 'monthly' },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Budget;
