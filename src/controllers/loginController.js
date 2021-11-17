const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const userModel = require('../models/userModel');

const secret = 'hardcoded-secret';

const authenticated = rescue(async (req, res) => {
  const { email } = req.body;
    
  const userFound = await userModel.getUserByEmail(email);
  console.log(userFound);
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const { _id, role } = userFound;
  console.log(_id, role);

  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
  return res.status(200).json({ token });
});

module.exports = {
  authenticated,
};