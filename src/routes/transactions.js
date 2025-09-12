const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// Crear transacción
router.post('/', auth, async (req, res) => {
  const { accountId, type, amount, category, description } = req.body;
  try {
    const transaction = await Transaction.create({ userId: req.user.id, accountId, type, amount, category, description });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener transacciones del usuario
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { userId: req.user.id } });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
