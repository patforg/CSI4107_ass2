/**
 * main app module
 */
var fs = require('fs');
var preprocess = require('./preprocess');
var barff = require('./barff');
var db = require('./db');

module.exports = function (config) {
    if (fs.existsSync(config.dbFile)) {
        dbData = require(config.dbFile);
        db(dbData);
    } //if

    // expose module's public api
    return {
        "preprocess": preprocess,
        "barff": barff,
        "db": db,
    }
};
