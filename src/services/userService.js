const userModel = require('../models/userModel');

const createUser = async ({ name, email, password, role }) => {
  const newUser = await userModel.createUser({ name, email, password, role });
  return {
    name,
    email,
    role: 'user',
    _id: newUser.insertedId,
  };
};

const createAdmin = async ({ name, email, password, role }) => {
  const newAdmin = await userModel.createUser({ name, email, password, role });
  return {
    name,
    email,
    role: 'admin',
    _id: newAdmin.insertedId,
  };
};

module.exports = {
  createUser,
  createAdmin,
};