const passport = require('passport');
const { validateTokenSignIn } = require('@Models/user');
const logger = require('@Util/log');

const handleSignIn = (req, res, next) => passport.authenticate('local',
(err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);
    const { email } = user;

    return validateTokenSignIn(email, isValidated => {
        logger.debug("is user validated: " + isValidated);
        if(!isValidated) return res.sendStatus(403);

        req.logIn(user, function(err) {
            if (err) return logger.debug(err);

            const ttl = new Date().getTime() + Number(process.env.sessionTTL);
            return res.status(200).send({ ttl });
        });
    });
})(req,res,next);

module.exports = {
    handleSignIn
};
