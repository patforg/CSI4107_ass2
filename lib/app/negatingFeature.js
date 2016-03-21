var fs = require('fs');

// Read all the maxdiff words
var negatingWords = {};
var data = fs.readFileSync(__dirname + '/../../data/negatingWordList.txt','utf-8');
data.split('\r\n').forEach(function(line){
    if(line) {
        negatingWords[line] = true;
    }
});

/**
 * count the number of words that are all caps
 */
module.exports = function (headers, features) {

    var db = require('./db')();
    headers.push("@ATTRIBUTE negatingWords NUMERIC");

    for (var docId in db.documents) {
        if (db.documents.hasOwnProperty(docId)) {

            var currentTerm,
                terms = db.documents[docId].terms,
                i = terms.length - 1,
                score = 0;

            for (; i >= 0; i--) {
                currentTerm = terms[i].toLowerCase();
                if (negatingWords.hasOwnProperty(currentTerm)) {
                    score -= 1;
                } //if
            } //for

            features[docId] = features[docId] || []; // Initialize array
            features[docId].push(
                score
            );
        }
    }
};
