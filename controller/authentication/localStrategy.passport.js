const LocalStrategy = require('passport-local');
const { find_one } = require('@Models/User');
const { verifyPassword } = require('@Util/password');

const strategy = new LocalStrategy({ usernameField: 'username' },
  (username, password, done) => {
      find_one({ username }, "No such user").then(async (user) => {
        const isVerified = await verifyPassword(password, user.pw);
        return isVerified ? done(null, user) : done(null, false);
    }).catch(_err => {
        return done(null, false);
    });
  }
);

module.exports = {
    localStrategy: strategy
};
