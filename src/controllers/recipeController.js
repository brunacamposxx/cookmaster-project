const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const createRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.headers.authorization;
  const newRecipe = await recipeService.createRecipe({ name, ingredients, preparation, userId });

  return res.status(201).json({ recipe: newRecipe });
});

const getAllRecipes = rescue(async (req, res) => {
  const recipes = await recipeService.getAllRecipes();
  console.log(recipes);
  return res.status(200).json(recipes);
});

module.exports = {
  createRecipe,
  getAllRecipes,
};