const { ObjectId } = require('mongodb');
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

// userId está chegando null =(
// error: argument passed in must be a single string of 12 btes or a string of 24 hex characters
const getRecipeById = async (id) => {
  const db = await connection();
  // if (!ObjectId.isValid(id)) return;
  const recipeById = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipeById;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};