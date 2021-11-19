const router = require('express').Router();
const loginController = require('../../controllers/loginController');
const { allFieldsMustBeFilled, incorrectUserOrPwd } = require('../../middlewares/validation');

router.post('/', allFieldsMustBeFilled, incorrectUserOrPwd, loginController.authenticated);

module.exports = router;