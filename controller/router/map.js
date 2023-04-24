const signInRouter = require('@Router/signin');
const signupRouter = require('@Router/signup');

const routesMap = {
    '/signin': signInRouter,
    '/signup': signupRouter,
};

module.exports = routesMap;
