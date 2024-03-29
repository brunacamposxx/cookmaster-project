// const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');

const secret = 'hardcoded-secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const authorization = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const decoded = jwt.verify(token, secret, jwtConfig);
    const getByEmail = await userModel.getUserByEmail(decoded.email);
    req.user = getByEmail;
    if (!getByEmail) return res.status(401).json({ message: 'jwt malformed' });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  authorization,
};