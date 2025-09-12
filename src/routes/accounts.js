const express = require('express');
const Account = require('../models/Account');
const auth = require('../middleware/auth');

const router = express.Router();

// Crear cuenta
router.post('/', auth, async (req, res) => {
  const { name, type, balance } = req.body;
  try {
    const account = await Account.create({ userId: req.user.id, name, type, balance });
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener cuentas del usuario
router.get('/', auth, async (req, res) => {
  try {
    const accounts = await Account.findAll({ where: { userId: req.user.id } });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
