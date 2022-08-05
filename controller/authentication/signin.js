const passport = require('passport');

const handleSignIn = (req, res, next) => passport.authenticate('local',
(err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);

    req.logIn(user, function(err) {
        if (err) return next(err);

        return res.status(200).send({ name: user.name });
  });
})(req,res,next);

module.exports = {
    handleSignIn
};