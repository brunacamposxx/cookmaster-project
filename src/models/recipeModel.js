// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({
    name, ingredients, preparation, userId });
    return {
      name,
      ingredients,
      preparation,
      userId,
      _id: newRecipe.insertId,
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};