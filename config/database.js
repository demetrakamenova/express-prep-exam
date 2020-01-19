const mongoose = require('mongoose');
const config = require('./config');
const dbName = 'exam-prep';

module.exports = () => {

    //return promise from mongoose connect
    return mongoose.connect(config.dbURL + dbName, { useNewUrlParser: true, useUnifiedTopology: true },
        console.log('###Database is READY!###'));
}

