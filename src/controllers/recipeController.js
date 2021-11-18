const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const createRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.headers.authorization;
  const newRecipe = await recipeService.createRecipe({ name, ingredients, preparation, userId });

  return res.status(201).json({ recipe: newRecipe });
});

module.exports = {
  createRecipe,
};