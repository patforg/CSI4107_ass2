var fs = require('fs');

// Read all the maxdiff words
var dictionary = {};
var data = fs.readFileSync(__dirname + '/../../data/dictionary.txt','utf-8');
data.split('\r\n').forEach(function(line){
    if(line) {
        dictionary[line] = true;
    }
});

/**
 * count the total of word positivity
 */
module.exports = function (headers, features) {

    var db = require('./db')();
    headers.push("@ATTRIBUTE wellWritten NUMERIC");

    for (var docId in db.documents) {
        if (db.documents.hasOwnProperty(docId)) {

            var currentTerm,
                terms = db.documents[docId].terms,
                i = terms.length - 1,
                score = 0;

            for (; i >= 0; i--) {
                currentTerm = terms[i].toLowerCase();
                if (dictionary.hasOwnProperty(currentTerm)) {
                    score ++;
                } //if
            } //for

            features[docId] = features[docId] || []; // Initialize array
            features[docId].push(
                score / db.documents[docId].terms.length
            );
        }
    }
};
