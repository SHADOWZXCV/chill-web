const express = require('express');
const signInRouter = express.Router();
const { handleSignIn } = require('@Controller/authentication/signin');

signInRouter.post('/', handleSignIn);

module.exports = signInRouter;
