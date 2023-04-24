const mongoose = require('mongoose');
const Schemas = require('./schemas');
const logger = require('@Util/log');

// DB Singleton design pattern
class DB {
    // using new keyword and without new is the same now!
    static _instance;

    constructor() {
        if(!DB._instance) {
        mongoose.connect(process.env.DBUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            }).then(() => logger.info('mongodb is connected!')).catch(err => {
            return logger.fatal(err);
        });
            DB._instance = this;
        }

        return DB._instance;
    }

    getModel({ modelName, collectionName }) {
        const mongooseSchema = this._generateSchema(modelName, collectionName);
        return this._createModel(modelName, mongooseSchema);
    }

    _generateSchema(schemaName, collectionName){
        const schema = Schemas[schemaName]
        return mongoose.Schema(schema, { collection: collectionName });
    }

    _createModel(modelName, mongooseSchema){
        return mongoose.model(modelName, mongooseSchema);
    }
}

module.exports = new DB();
