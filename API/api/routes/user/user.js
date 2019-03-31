const express = require('express');
const router = express.Router();
const checkUserAuth = require('../../middleware/userAuth');
const userController = require('../../controller/user/user');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;