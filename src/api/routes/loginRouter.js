const router = require('express').Router();
const loginController = require('../../controllers/loginController');
const { allFieldsMustBeFilled, incorrectUserOrPwd } = require('../../middlewares/validation');
// const validateJWT = require('../auth/validateJWT');

router.post('/',
// validateJWT,
allFieldsMustBeFilled,
incorrectUserOrPwd,
loginController.authenticated);

module.exports = router;