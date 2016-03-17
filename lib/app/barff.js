/**
 * function to creates a bunch of arff files
 */

var async = require('async');

var getDB = require('./db');

// setup stream to read file with all the tweets
var fs = require('fs');
var readline = require('readline');

/*---------------------------------------------------------------------------*
 *                               LOCAL FUNCTIONS                             *
 *---------------------------------------------------------------------------*/

/**
 * adds category feature
 */
var categoryFeature = function (doc, features) {
    features.push(doc.sentiment);
};

var exclamationRegEx = /\!/g;
var questionRegEx = /\!/g;
/**
 * count the number of ! and ? in text
 */
var punctuationFeature = function (doc, features) {
    var exclamationMatch = doc.text.match(exclamationRegEx);
    var questionMatch = doc.text.match(questionRegEx);

    features.push(
        (exclamationMatch ? exclamationMatch.length : 0),
        (questionMatch ? questionMatch.length : 0)
    );
};


var quoteRegEx = /'/g;
/**
 * adds text feature
 */
var textFeature = function (doc, features) {
    features.push("'"+ doc.text.replace(quoteRegEx,"\\'") +"'" );
};

/*---------------------------------------------------------------------------*
 *                                MODULE EXPORT                              *
 *---------------------------------------------------------------------------*/
module.exports = function (config, callback) {

    var doc, featureId, 
        activeFeatures, arffStream, writeHeaders, 
        processFeatures, i = 0,
        db = getDB(), 
        docIds = Object.keys(db.documents),
        docLen = docIds.length,
        headers = [];

    activeFeatures = {
        "categoryFeature": categoryFeature,
        "punctuationFeature": punctuationFeature,
//        "textFeature": textFeature,
    };

    /*
     * Add headers to headers array
     * only add attributes when features 
     * exist in activeFeatures Object
     */
    headers.push("@RELATION sentiment");

    if (activeFeatures.hasOwnProperty("categoryFeature")) {
        headers.push(
            "@ATTRIBUTE category {positive,negative,neutral,objective}"
        );
    } //if

    if (activeFeatures.hasOwnProperty("punctuationFeature")) {
        headers.push(
            "@ATTRIBUTE exclamation NUMERIC",
            "@ATTRIBUTE question  NUMERIC"
        );
    } //if

    if (activeFeatures.hasOwnProperty("textFeature")) {
        headers.push(
            "@ATTRIBUTE text STRING"
        );
    } //if
    headers.push("@DATA\n");


    arffStream = fs.createWriteStream(config.arffFilePath + "/main.arff");

    // callback when stream is marked as finished
    arffStream.on("end", callback);

    /*
     * Writes headers to stream, retries on failed write
     * will call processFeatures when completed
     */
    writeHeaders = function () {

        if (arffStream.write(headers.join("\n"))) {
            headers = null;
            processFeatures();
        } else { // failed to write
            arffStream.once("drain", writeHeaders);
        } //if

    };

    /*
     * Builds features for each document
     * will wait for drain event on failed write
     * will close stream when all documents are
     * processsed
     */
    processFeatures = function () {
        var features, docId, ok = true;
        while (ok && i < docLen) {
            docId = docIds[i];
            features = [];
            for (featureId in activeFeatures) {
                activeFeatures[featureId](db.documents[docId], features);
            } //for

            if (arffStream.write(features.join(",") + "\n")) {
                i++;
            } else { // failed to write
                ok = false;
            } //if
        } // for

        if (i < docLen) {
            arffStream.once("drain", processFeatures);
        } else {
            arffStream.end();
        } //if
    };

    arffStream.once('open', function() {
        writeHeaders();
    });
};
