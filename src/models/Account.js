const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Account = sequelize.define('Account', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('checking', 'savings', 'credit'), allowNull: false },
  balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Account;
