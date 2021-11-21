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
      _id: newRecipe.insertedId,
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const recipeById = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipeById;
};

const updateRecipe = async ({ id, name, ingredients, preparation }) => {
  const db = await connection();
  const update = await db.collection('recipes').findOneAndUpdate({
    _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    return update;
};

const excludeRecipe = async (id) => {
  const db = await connection();
  const exclude = await db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) });
  return exclude;
};

const addImage = async ({ id, imageURL }) => {
  const db = await connection();
  const update = await db.collection('recipes').findOneAndUpdate({
    _id: ObjectId(id) }, { $set: { imageURL } });
    return update;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  excludeRecipe,
  addImage,
};