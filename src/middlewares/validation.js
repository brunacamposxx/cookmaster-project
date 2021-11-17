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

const allFieldsMustBeFilled = (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

const incorrectUserOrPwd = async (req, res, next) => {
  const { email, password } = req.body;
  const getByEmail = await userModel.getUserByEmail(email);
  console.log(getByEmail);
  if (!getByEmail || getByEmail.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = {
  invalidEntries,
  invalidEmail,
  allFieldsMustBeFilled,
  incorrectUserOrPwd,
};