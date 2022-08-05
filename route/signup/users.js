const express = require('express');
const signupRouter = express.Router();
const {
    handleSignup,
    validateEmail,
    signInNewUser
} = require('@Controller/authentication/signup');

signupRouter.post('/', handleSignup);
signupRouter.post('/validate', validateEmail, signInNewUser);

module.exports = signupRouter;
