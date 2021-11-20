const router = require('express').Router();
// const multer = require('multer');
const recipeController = require('../../controllers/recipeController');
const { invalidEntriesLogin } = require('../../middlewares/validation');
const { authorization } = require('../auth/validateJWT');

// const upload = multer({ dest: 'uploads/' });

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', authorization, recipeController.updateRecipe);
router.delete('/:id', authorization, recipeController.excludeRecipe);
router.post('/', invalidEntriesLogin, authorization, recipeController.createRecipe);
// router.post('/', upload.single('image'));

module.exports = router;