const recipeModel = require('../models/recipeModel');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const newRecipe = await recipeModel.createRecipe({ name, ingredients, preparation, userId });
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipeById = await recipeModel.getRecipeById(id);
  // if (!recipeById) {
  //   throw new Error('Recipe not found');
  // }
  return recipeById;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};