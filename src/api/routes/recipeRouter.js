const router = require('express').Router();
const recipeController = require('../../controllers/recipeController');
const { invalidEntriesLogin } = require('../../middlewares/validation');
const { authorization } = require('../auth/validateJWT');

router.post('/', invalidEntriesLogin, authorization, recipeController.createRecipe);

module.exports = router;