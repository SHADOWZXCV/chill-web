const { Router } = require('express');
const signInRouter = Router();
const { validateBody } = require('@Middleware/validateBody.middleware');
const { handleSignIn } = require('@Controller/authentication/signin');

signInRouter.post('/', validateBody, handleSignIn);

module.exports = signInRouter;
