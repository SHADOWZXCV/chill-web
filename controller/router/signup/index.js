const { Router } = require('express');
const signupRouter = Router();
const { validateBody } = require('@Middleware/validateBody.middleware');
const {
    handleSignup,
    confirmEmail
} = require('@Controller/authentication/signup');

signupRouter.post('/', validateBody, handleSignup);
signupRouter.post('/validate', validateBody, confirmEmail);

module.exports = signupRouter;
