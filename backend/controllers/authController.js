// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

class AuthController {
  static async signup(req, res) {
    const { fullName, userType, email, password } = req.body;

    try {
      const existingUser = await UserModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.addUser({
        fullName,
        userType,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error during signup:', error); // Log detailed error
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' }); // 401 for authentication errors
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token, userType: user.userType });
    } catch (error) {
      console.error('Error during login:', error); // Log detailed error
      res.status(500).json({ error: 'Error logging in' });
    }
  }
}

module.exports = AuthController;
