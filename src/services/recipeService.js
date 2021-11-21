const { ObjectId } = require('mongodb');
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
  if (!ObjectId.isValid(id)) return null;
  const recipeById = await recipeModel.getRecipeById(id);
  return recipeById;
};

const updateRecipe = async ({ id, name, ingredients, preparation, userId, role }) => {
  if (!ObjectId.isValid(id)) return null;
  const findByid = await recipeModel.getRecipeById(id);

  if (findByid.userId === userId || role === 'admin') {
    await recipeModel.updateRecipe({ id, name, ingredients, preparation });
  }

  return {
    _id: id, name, ingredients, preparation, userId };
};

const excludeRecipe = async (id) => {
  if (ObjectId.isValid(id)) return null;
  const result = await recipeModel.excludeRecipe(id);
  return result;
};

const addImage = async ({ id, userId, role }) => {
  if (!ObjectId.isValid(id)) return null;
  const findById = await recipeModel.getRecipeById(id);
  const { name, ingredients, preparation } = findById;
  const imageURL = `localhost:3000/src/uploads/${id}.jpeg`;

  if (findById.userId === userId || role === 'admin') {
    await recipeModel.addImage({ id, imageURL });
  }

  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
    image: imageURL,
  };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  excludeRecipe,
  addImage,
};