const isSignedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.status(403).send({ unauthenticated: true });
    }
};

module.exports = isSignedIn;
