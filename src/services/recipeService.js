const recipeModel = require('../models/recipeModel');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const newRecipe = await recipeModel.createRecipe({ name, ingredients, preparation, userId });
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAllRecipes();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};