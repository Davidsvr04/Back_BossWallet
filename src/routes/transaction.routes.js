const express = require('express');
const router = express.Router();
const {
  addIncome,
  addExpense,
  getUserBalance,
  getUserTransactions,
  deleteTransaction
} = require('../controllers/transaction.controller');

// POST /api/transactions/income - Agregar ingreso
router.post('/income', addIncome);

// POST /api/transactions/expense - Agregar gasto
router.post('/expense', addExpense);

// GET /api/transactions/balance/:user_id - Obtener balance del usuario
router.get('/balance/:user_id', getUserBalance);

// GET /api/transactions/user/:user_id - Obtener transacciones del usuario
router.get('/user/:user_id', getUserTransactions);

// DELETE /api/transactions/:transaction_id - Eliminar transacción
router.delete('/:transaction_id', deleteTransaction);

module.exports = router;