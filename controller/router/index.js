const routesMap = require("@Router/map");

// Register routes based on a map of routes.
module.exports = {
    registerRoutes: (app) => Object.entries(routesMap).map(([path, router]) => {
        app.use(path, router);
    })
};
