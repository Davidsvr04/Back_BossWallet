const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const { User } = require('./models');
const { Transaction } = require('./models');


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
app.use('/api/users', require('./routes/User.routes'));
app.use('/api/transactions', require('./routes/transaction.routes'));
// app.use('/api/auth', require('./routes/auth'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Gestión de Finanzas');
});

module.exports = app;
