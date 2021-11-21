const router = require('express').Router();
const userController = require('../../controllers/userController');
const { invalidEntries, invalidEmail } = require('../../middlewares/validation');
// const { authorization } = require('../auth/validateJWT');

router.post('/', invalidEntries, invalidEmail, userController.createUser);
// router.post('/admin', authorization, onlyAdmins, userController.createAdmin);

module.exports = router;