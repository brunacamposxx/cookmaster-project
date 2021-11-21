const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const createRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const newRecipe = await recipeService.createRecipe({ name, ingredients, preparation, userId });

  return res.status(201).json({ recipe: newRecipe });
});

const getAllRecipes = rescue(async (req, res) => {
  const recipes = await recipeService.getAllRecipes();
  return res.status(200).json(recipes);
});

const getRecipeById = rescue(async (req, res) => {
  const { id } = req.params;

  const recipeById = await recipeService.getRecipeById(id);
  if (!recipeById) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipeById);
});

const updateRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId, role } = req.user;

  const updateRecipes = await recipeService.updateRecipe({
    id, name, ingredients, preparation, userId, role });

  return res.status(200).json(updateRecipes);
});

const excludeRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const exclude = await recipeService.excludeRecipe(id);
  return res.status(204).json(exclude);
});

const addImage = rescue(async (req, res) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;
  // const { image } = req.file;

  const updateRecipeImg = await recipeService.addImage({ id, userId, role });
  return res.status(200).json(updateRecipeImg);
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  excludeRecipe,
  addImage,
};