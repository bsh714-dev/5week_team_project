const express = require('express');
const router = express.Router();

const SignUpController = require('../controller/signup.controller');
const signUpController = new SignUpController();

router.post('/', signUpController.signUp);

module.exports = router;
