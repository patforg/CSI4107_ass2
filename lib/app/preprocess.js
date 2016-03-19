/**
 * function to preprocess all documents
 */

var async = require('async');

// import our document processor lib
var preprocessor = require('../preprocessor');
var db = require('./db')();

// setup stream to read file with all the tweets
var fs = require('fs');
var readline = require('readline');

/*---------------------------------------------------------------------------*
 *                               LOCAL FUNCTIONS                             *
 *---------------------------------------------------------------------------*/

/**
 * pre-process documents
 */
var processDocuments = function (documentsFile, callback) {

    var instream = fs.createReadStream(documentsFile);

    var lineReader = readline.createInterface({
        input: instream,
        terminal: false
    });

    // process each line
    var documentCount = 0;
    var quoteRegEx = /^\"|\"$/g;
    lineReader.on('line', function (line) {
        var parts = line.split("\t")
        var doc = {
            id: parts[0],
            userId: parts[1],
            sentiment: parts[2].replace(quoteRegEx,''),
            offset: documentCount,
            text: parts[3], //.toLowerCase(),
            terms: [],
        };

        // pass document object to our 
        // document preocessor
        preprocessor.processDocument(doc);

        db.documents[doc.id] = doc;
        documentCount++;

    }).on('close', function () {
        db.documentCount = documentCount;
        if (callback) {
            callback(null);
        } //if
    });
};

/*---------------------------------------------------------------------------*
 *                                MODULE EXPORT                              *
 *---------------------------------------------------------------------------*/
module.exports = function (config, callback) {

    // process docs and queries
    async.parallel([
        processDocuments.bind(null, config.documentsFile),
        //processQueries.bind(null, config.queriesFile),
    ], callback);
};

