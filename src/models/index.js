const User = require('./User.models');
const Transaction = require('./Transaction.models');

// Definir relaciones
User.hasMany(Transaction, {
  foreignKey: 'user_id',
  as: 'transactions'
});

Transaction.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

module.exports = {
  User,
  Transaction
};