const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
// const userModel = require('../../models/userModel');

const secret = 'hardcoded-secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const authorization = rescue(async (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret, jwtConfig);
  console.log(decoded);

    if (token !== decoded) {
      return res.status(400).json({ message: 'jwt malformed' });
    }
    next();
});

module.exports = {
  authorization,
};