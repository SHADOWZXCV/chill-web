const randtoken = require("rand-token");
const { add_record, validateAndSetToken } = require('@Models/User');
const { hashPassword } = require('@Util/password');
const { sendEmailToken } = require("@Util/email");
const { generateErrorResponse } = require('@Util/errors');
const logger = require('@Util/log');

const handleSignup = async (req, res) => {
    const { body: { password, username, email } } = req;
    const randToken = randtoken.generate(20);

    const [hashedPassword, salt] = await hashPassword(password).catch(err => logger.error(err.message));
    return add_record({
        username: username,
        email: email,
        pw: hashedPassword,
        salt,
        emailVerificationToken: randToken
    }).then(doc => {
        res.status(200).send({ email: doc.email });
        sendEmailToken(email, randToken);
    })
    .catch(_err => generateErrorResponse(res, 405, "account-exists"));
};

const confirmEmail = (req, res) => {
    const { body: { email, token }} = req;

    return validateAndSetToken(email, token).then(() => res.sendStatus(200)).catch((err) => {
        logger.debug(err.message);
        return res.sendStatus(405);
    });
};

module.exports = {
    handleSignup,
    confirmEmail
};
