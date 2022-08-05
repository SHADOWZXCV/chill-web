const validator = require('validator');

const USERSCHEMA = {
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: value => validator.isEmail(value)
    },
    pw: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    emailVerificationToken: {
        type: String,
        required: true
    }
};


module.exports = {
    USERSCHEMA
};
