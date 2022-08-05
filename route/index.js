const signInRouter = require('@Route/signin');
const signupRouter = require('@Route/signup/users');

module.exports = (app) => {
    app.use('/signin', signInRouter);
    app.use('/signup', signupRouter);
};
