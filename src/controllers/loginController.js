const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const userModel = require('../models/userModel');

const secret = 'hardcoded-secret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// usuário autenticado. só cai aqui depois de validar usuario e senha; depois de incorrectUserOrPwd
const authenticated = rescue(async (req, res) => {
  const { email } = req.body;
    
  const userFound = await userModel.getUserByEmail(email);
  const { password, ...userWithPassword } = userFound;
  const { _id, role } = userWithPassword;
  
  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
  return res.status(200).json({ token });
});

module.exports = {
  authenticated,
};