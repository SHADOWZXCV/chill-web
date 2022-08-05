const LocalStrategy = require('passport-local');
const { userModel } = require('@Models/user');
const { verify } = require('@Util/password');

const strategy = new LocalStrategy({ usernameField: 'username' },
  (username, password, done) => {
      userModel.findOne({ username }, (err, user) => {
        if(err){
            return done(err);
        } if(user){
            return verify(password, user.pw, doesMatch => {
                return doesMatch ? done(null, user) : done(null, false);
            });
        } else {
            return done(null, false);
        }
    });
  }
);

const signupStrategy = new LocalStrategy({ usernameField: 'email', passwordField: 'email' },
  (email, _password, done) => {
    userModel.findOne({ email }, (err, user) => {
        if(err){
            return done(err);
        } if(!user){
            return done(null, false);
        }

        return done(null, user);
    });
  }
);

module.exports = {
    localStrategy: strategy,
    signupLocalStrategy: signupStrategy
};
