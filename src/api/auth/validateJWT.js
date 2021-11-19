const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');

const secret = 'hardcoded-secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const authorization = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, secret, jwtConfig);
    const user = await userModel.getUserByEmail(decoded.email);
    
    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
});

module.exports = {
  authorization,
};