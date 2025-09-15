const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const { id_card, full_name, email, passwords } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!id_card || !full_name || !email || !passwords) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos (id_card, full_name, email, passwords)'
      });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({
        error: 'El email ya está registrado'
      });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    const passwordHasheada = await bcrypt.hash(passwords, saltRounds);

    // Crear el usuario
    const nuevoUsuario = await Usuario.create({
      id_card,
      full_name,
      email,
      passwords: passwordHasheada
    });

    // Responder sin incluir la contraseña
    const { passwords: _, ...usuarioSinPassword } = nuevoUsuario.toJSON();

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: usuarioSinPassword
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['passwords'] } // Excluir contraseñas de la respuesta
    });

    res.json({
      usuarios,
      total: usuarios.length
    });

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};

// Obtener usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['passwords'] }
    });

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      usuario
    });

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};

// Actualizar usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_card, full_name, email, passwords } = req.body;

    // Buscar el usuario
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Verificar si el nuevo email ya existe (si se está actualizando)
    if (email && email !== usuario.email) {
      const emailExistente = await Usuario.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(400).json({
          error: 'El email ya está registrado'
        });
      }
    }

    // Preparar datos para actualizar
    const datosActualizacion = {};
    if (id_card) datosActualizacion.id_card = id_card;
    if (full_name) datosActualizacion.full_name = full_name;
    if (email) datosActualizacion.email = email;

    // Si se proporciona nueva contraseña, encriptarla
    if (passwords) {
      const saltRounds = 10;
      datosActualizacion.passwords = await bcrypt.hash(passwords, saltRounds);
    }

    // Actualizar usuario
    await usuario.update(datosActualizacion);

    // Obtener usuario actualizado sin contraseña
    const usuarioActualizado = await Usuario.findByPk(id, {
      attributes: { exclude: ['passwords'] }
    });

    res.json({
      mensaje: 'Usuario actualizado exitosamente',
      usuario: usuarioActualizado
    });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};

// Eliminar usuario
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    await usuario.destroy();

    res.json({
      mensaje: 'Usuario eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};