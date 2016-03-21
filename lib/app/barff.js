/**
 * function to creates a bunch of arff files
 */

var db = require('./db')();

var capsFeature = require('./capsFeature');
var exclamationFeature = require('./exclamationFeature');
var maxDiffFeature = require('./maxDiffFeature');
var questionMarkFeature = require('./questionMarkFeature');
var sentimentFeature = require('./sentimentFeature');
var smileyFeature = require('./smileyFeature');
var bagOfWordsFeature = require('./bagOfWordsFeature');
var negatingFeature = require('./negatingFeature');
var neutralityFeature = require('./neutralityFeature');

// setup stream to read file with all the tweets
var fs = require('fs');

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

    var arffStream, i,
        headers = [],
        features = {},
        activeFeatures = [
            sentimentFeature,
            capsFeature,
            exclamationFeature,
            maxDiffFeature,
            questionMarkFeature,
            negatingFeature,
            neutralityFeature,
            //bagOfWordsFeature,
            smileyFeature,
        ];

    headers.push("@RELATION sentiment");

    for(i = 0; i < activeFeatures.length; i++)
        activeFeatures[i](headers, features);

    headers.push("@DATA\n");

    arffStream = fs.createWriteStream(config.arffFilePath + "/main.arff");

    // callback when stream is marked as finished
    arffStream.on("end", callback);

    /*
     * Writes content to stream, retries on failed write
     */
    var writeContent = function () {
        var content = [];
        for(var key in features)
            if(features.hasOwnProperty(key))
                content.push(features[key].join(","));

        if (arffStream.write(headers.join("\n") + content.join("\n"))) {
            arffStream.end();
        }

    };

    arffStream.once('open', function() {
        writeContent();
    });
};
