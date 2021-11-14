const router = require('express').Router();
const userController = require('../../controllers/userController');
const { invalidEntries, invalidEmail } = require('../../middlewares/validation');

router.post('/', invalidEntries, invalidEmail, userController.createUser);

module.exports = router;