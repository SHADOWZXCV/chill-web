const mongoose = require('mongoose');
const { USERSCHEMA } = require('./schemas');
const logger = require('@Util/log');

class DB {
    constructor(){
        this._connect();
        this.userSchema = this._createInstance();
        this.userModel = this._createModel();
        this.validateToken = this.validateToken.bind(this);
    }

    _connect(){
        mongoose.connect(process.env.DBUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } ,(err) => err ? logger.fatal(err) : logger.info('db is conntected'));
    }

    getConnection(){
        return mongoose.connection;
    }

    _createInstance(){
        return mongoose.Schema(USERSCHEMA, { collection: 'users' });
    }

    _createModel(){
        return mongoose.model('User', this.userSchema);
    }

    validateToken(email, token, cb){
        this.userModel.findOne({ email }, async (err, user) => {
            if(err)
                return logger.error(err)
            if(!user)
                return cb(false);

            const { emailVerificationToken: orgToken } = user;
            logger.debug(`token sent by user: ${token}, and token in db is: ${orgToken}`);
            if(!orgToken)
                return cb(false);
            if(orgToken === token){
                await this.userModel.updateOne({ email }, {
                    $set: {
                        emailVerificationToken: ''
                    }
                });
                return cb(true);
            }
        })
    }
}

module.exports = new DB();
