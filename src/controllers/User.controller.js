const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { id_card, full_name, email, password } = req.body;

    // Validate that all required fields are present
    if (!id_card || !full_name || !email || !password) {
      return res.status(400).json({
        error: 'All fields are required (id_card, full_name, email, password)'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: 'Email is already registered'
      });
    }

    // Encrypt password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const newUser = await User.create({
      id_card,
      full_name,
      email,
      password: hashedPassword
    });

    // Respond without including the password
    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Exclude passwords from response
    });

    res.json({
      users,
      total: users.length
    });

  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.json({
      user
    });

  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_card, full_name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({
          error: 'Email is already registered'
        });
      }
    }

    const updateData = {};
    if (id_card) updateData.id_card = id_card;
    if (full_name) updateData.full_name = full_name;
    if (email) updateData.email = email;

    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    await user.update(updateData);

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    await user.destroy();

    res.json({
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};