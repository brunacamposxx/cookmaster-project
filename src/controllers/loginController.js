const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const userModel = require('../models/userModel');

const secret = 'hardcoded-secret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const authenticated = rescue(async (req, res) => {
  const { email } = req.body;
    
  const userFound = await userModel.getUserByEmail(email);
  const { _id, role } = userFound;
  
  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
  return res.status(200).json({ token });
});

module.exports = {
  authenticated,
};