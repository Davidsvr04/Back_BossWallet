const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/finanzas', {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
