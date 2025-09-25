const { Transaction, User } = require('../models');
const { Op } = require('sequelize');

// Agregar ingreso
const addIncome = async (req, res) => {
  try {
    const { user_id, amount, description, category } = req.body;

    if (!user_id || !amount || !description) {
      return res.status(400).json({
        error: 'Fields user_id, amount, and description are required'
      });
    }

    // Verificar que el usuario existe
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const newIncome = await Transaction.create({
      user_id,
      type: 'income',
      amount,
      description,
      category: category || 'General'
    });

    res.status(201).json({
      message: 'Income added successfully',
      transaction: newIncome
    });

  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Agregar gasto
const addExpense = async (req, res) => {
  try {
    const { user_id, amount, description, category } = req.body;

    if (!user_id || !amount || !description) {
      return res.status(400).json({
        error: 'Fields user_id, amount, and description are required'
      });
    }

    // Verificar que el usuario existe
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const newExpense = await Transaction.create({
      user_id,
      type: 'expense',
      amount,
      description,
      category: category || 'General'
    });

    res.status(201).json({
      message: 'Expense added successfully',
      transaction: newExpense
    });

  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Obtener balance del usuario
const getUserBalance = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Verificar que el usuario existe
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    // Calcular total de ingresos
    const totalIncome = await Transaction.sum('amount', {
      where: {
        user_id,
        type: 'income'
      }
    }) || 0;

    // Calcular total de gastos
    const totalExpenses = await Transaction.sum('amount', {
      where: {
        user_id,
        type: 'expense'
      }
    }) || 0;

    // Calcular balance total
    const totalBalance = totalIncome - totalExpenses;

    res.json({
      user_id,
      full_name: user.full_name,
      total_income: parseFloat(totalIncome),
      total_expenses: parseFloat(totalExpenses),
      balance: parseFloat(totalBalance.toFixed(2)),
      status: totalBalance >= 0 ? 'positive' : 'negative'
    });

  } catch (error) {
    console.error('Error getting user balance:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Obtener todas las transacciones de un usuario
const getUserTransactions = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { type, limit = 50, offset = 0 } = req.query;

    // Verificar que el usuario existe
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const whereClause = { user_id };
    if (type && ['income', 'expense'].includes(type)) {
      whereClause.type = type;
    }

    const transactions = await Transaction.findAll({
      where: whereClause,
      order: [['date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const total = await Transaction.count({
      where: whereClause
    });

    res.json({
      transactions,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Eliminar transacción
const deleteTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;

    const transaction = await Transaction.findByPk(transaction_id);
    if (!transaction) {
      return res.status(404).json({
        error: 'Transaction not found'
      });
    }

    await transaction.destroy();

    res.json({
      message: 'Transaction deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  addIncome,
  addExpense,
  getUserBalance,
  getUserTransactions,
  deleteTransaction
};