const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/usuario.controller');

// GET /api/usuarios - Obtener todos los usuarios
router.get('/', obtenerUsuarios);

// GET /api/usuarios/:id - Obtener usuario por ID
router.get('/:id', obtenerUsuarioPorId);

// POST /api/usuarios - Crear nuevo usuario
router.post('/', crearUsuario);

// PUT /api/usuarios/:id - Actualizar usuario
router.put('/:id', actualizarUsuario);

// DELETE /api/usuarios/:id - Eliminar usuario
router.delete('/:id', eliminarUsuario);

module.exports = router;