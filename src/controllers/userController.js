const rescue = require('express-rescue');
const userService = require('../services/userService');

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userService.createUser({ name, email, password });

  return res.status(201).json({ user: newUser });
});

const createAdmin = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newAdmin = await userService.createAdmin({ name, email, password });

  return res.status(201).json({ user: newAdmin });
});

module.exports = {
  createUser,
  createAdmin,
};
