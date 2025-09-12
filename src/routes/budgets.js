const express = require('express');
const Budget = require('../models/Budget');
const auth = require('../middleware/auth');

const router = express.Router();

// Crear presupuesto
router.post('/', auth, async (req, res) => {
  const { category, limit, period } = req.body;
  try {
    const budget = await Budget.create({ userId: req.user.id, category, limit, period });
    res.status(201).json(budget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener presupuestos del usuario
router.get('/', auth, async (req, res) => {
  try {
    const budgets = await Budget.findAll({ where: { userId: req.user.id } });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
