const logger = require('@Util/log');
const Model = require('@Models').getModel({
    modelName: 'User',
    collectionName: 'users'
});

// https://mongoosejs.com/docs/async-await.html
// For mongoose async-await usage
// use exec() to return promises from queries, without async, since async gives ability to:
/**
 * 1. Wrap a non-promise in a promise if the function does not return a promise itself.
 * 2. To use await, and since these do not require await, let's avoid them.
 */

async function validateAndSetToken(email, token){
    const orgToken = await getUserEmailToken(email);

    logger.debug(`token sent by user: ${token}, and token in db is: ${orgToken}`);
    if(orgToken !== token)
        throw new Error("Tokens don't match!");

    return update_one({ email }, {
        emailVerificationToken: ''
    });
}

async function getUserEmailToken(email){
    const { emailVerificationToken } = await find_one({ email });

    return emailVerificationToken;
}

function update_one(filter, updateData) {
    return Model.updateOne(filter, {
        $set: updateData
    }).exec();
}

async function find_one(filter) {
    const data = await Model.findOne(filter).exec();

    return data;
}

function add_record(userData) {
    return new Model(userData).save();
}

function findById(id) {
    return Model.findById(id).exec();
}

module.exports = {
    validateAndSetToken,
    add_record,
    find_one,
    update_one,
    findById
};
