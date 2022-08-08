require('dotenv').config();
require('module-alias/register');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const registerRoutes = require('@Route');
const { userModel, getConnection } = require('@Models/user');
const { signupLocalStrategy, localStrategy } = require('@Controller/authentication/localStrategy.passport');
const { corsOptions, checkState } = require('./config');
const morganMiddleware = require('./middleware/morganLogger.middleware');
const logger = require('@Util/log');
const app = express();

app.use(cors(corsOptions));
app.use(
    session({
      secret: process.env.SS,
      name: process.env.secretSessionName,
      sameSite: true,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        client: getConnection().getClient(),
        dbName: process.env.dbName,
        collectionName: "sessions",
        // For some reason all below is
        // not useful in any shape or form
        // what I found is that the max age already does all the work!
        // autoRemove: 'interval',
        // autoRemoveInterval: 1
        // ttl: 1
      }),
      cookie: {
        maxAge: Number(process.env.sessionTTL),
        sameSite: true,
      }
    })
);
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
registerRoutes(app);


passport.use('local', localStrategy);
passport.use('signup-local', signupLocalStrategy);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    userModel.findById(id, function(err, user) {
        done(err, user);
    });
});

checkState();
app.listen(3000, () => logger.info("Chill is on port 3000"));
