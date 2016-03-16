/**
 * main app module
 */
var fs = require('fs');
var preprocess = require('./preprocess');
var db = require('./db');

module.exports = function (config) {
    if (fs.existsSync(config.dbFile)) {
        dbData = require(config.dbFile);
        db(dbData);
    } //if

    // expose module's public api
    return {
        "preprocess": preprocess,
        "db": db,
    }
};
