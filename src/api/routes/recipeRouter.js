const router = require('express').Router();
const multer = require('multer');
const recipeController = require('../../controllers/recipeController');
const { invalidEntriesLogin } = require('../../middlewares/validation');
const { authorization } = require('../auth/validateJWT');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', authorization, recipeController.updateRecipe);
router.delete('/:id', authorization, recipeController.excludeRecipe);
router.post('/', invalidEntriesLogin, authorization, recipeController.createRecipe);
router.put('/:id/image', upload.single('image'), authorization, recipeController.addImage);

module.exports = router;