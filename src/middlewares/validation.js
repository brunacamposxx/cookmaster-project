const userModel = require('../models/userModel');

const invalidEntries = (req, res, next) => {
  const { name, password, email } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;
  const validEmail = regex.test(email);
  if (!name || !password || !validEmail || !email) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const invalidEmail = async (req, res, next) => {
  const { email } = req.body;

  const getByEmail = await userModel.getUserByEmail(email);
  if (getByEmail) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

module.exports = {
  invalidEntries,
  invalidEmail,
};