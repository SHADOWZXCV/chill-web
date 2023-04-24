const argon2 = require('argon2');
const crypto = require('crypto');

const hashPassword = async (password) => {
    const salt = crypto.randomBytes(16);
    const hashed = await argon2.hash(password, salt);

    return [hashed, salt];
}

const verifyPassword = async (password, originalPassword) => await argon2.verify(originalPassword, password);

module.exports = {
    hashPassword,
    verifyPassword
};
