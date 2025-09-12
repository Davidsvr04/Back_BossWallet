const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a PostgreSQL
sequelize.authenticate()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error conectando a PostgreSQL:', err));

// Sincronizar modelos
sequelize.sync();

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/accounts', require('./src/routes/accounts'));
app.use('/api/transactions', require('./src/routes/transactions'));
app.use('/api/budgets', require('./src/routes/budgets'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Gestión de Finanzas');
});

module.exports = app;
