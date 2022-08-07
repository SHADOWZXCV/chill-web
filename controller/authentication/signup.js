const passport = require('passport');
const randtoken = require("rand-token");
const { userModel, validateToken } = require('@Models/user');
const { hash } = require('@Util/password');
const { sendEmailToken } = require("@Util/email");
const logger = require('@Util/log');

const handleSignup = (req, res) => {
    const { body } = req;
    const randToken = randtoken.generate(20);

    hash(body.password, (data, salt) => {
        const user = userModel({
            username: body.username,
            email: body.email,
            pw: data,
            salt,
            emailVerificationToken: randToken
        });
        user.save()
        .then(doc => {
            res.status(200).send({ email: doc.email });
            sendEmailToken(body.email, randToken);
        })
        .catch(_err => res.status(405).send({ error: `This email exists already!` }));
    });
};

const validateEmail = (req, res, next) => {
    const { body: { email, token }} = req;

    return validateToken(email, token, (isValidated) => {
        logger.debug(`isValidated: ${isValidated}`);
        if(!isValidated)
            return res.sendStatus(405);

        return next();
    });
};

const signInNewUser = (req, res, next) => passport.authenticate('signup-local',
(err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);

    req.logIn(user, function(err) {
        if (err) return next(err);

        const ttl = new Date().getTime() + Number(process.env.sessionTTL);
        return res.status(200).send({ ttl });
  });
})(req,res,next);

module.exports = {
    handleSignup,
    validateEmail,
    signInNewUser
};
