const connection = require('./connection');

const createUser = async ({ name, email, password, role }) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, email, password, role });
  return newUser;
};

const getUserByEmail = async (email) => {
  const db = await connection();
  const findEmail = await db.collection('users').findOne({ email });
  return findEmail;
};

module.exports = {
  createUser,
  getUserByEmail,
};
