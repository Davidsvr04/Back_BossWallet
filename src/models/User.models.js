const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id'
  },
  id_card: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'id_card'
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'full_name'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    field: 'email'
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'password'
  }
}, {
  tableName: 'user',
  timestamps: false, // Desactivar createdAt y updatedAt automáticos
  underscored: true
});

module.exports = User;