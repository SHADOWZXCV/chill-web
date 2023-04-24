const requirementsNotNull = (body, ...data) => data.every((elem) => body[elem] != null);

module.exports = {
    requirementsNotNull
};
