const argon2 = require('argon2');
const crypto = require('crypto');

const hash = (password, cb) => {
    const salt = crypto.randomBytes(16);
    argon2.hash(password, salt).then(data => cb(data, salt));
}

const verify = (password, originalPassword, cb) => {
    argon2.verify(originalPassword, password).then(data => cb(data));
}

module.exports = {
    hash,
    verify
};