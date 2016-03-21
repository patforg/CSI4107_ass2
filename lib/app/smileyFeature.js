var fs = require('fs');

// Read all the maxdiff words
var maxxDiffWords = {};
var data = fs.readFileSync(__dirname + '/../../data/symbolsPositivity.txt','utf-8');
data.split('\r\n').forEach(function(line){
    if(line) {
        var lineParts = line.split("\t");
        maxxDiffWords[lineParts[1]] = parseFloat(lineParts[0]);
    }
});

/**
 * count the total of word positivity
 */
module.exports = function (headers, features) {

    var db = require('./db')();
    headers.push("@ATTRIBUTE smileyScore NUMERIC");

    for (var docId in db.documents) {
        if (db.documents.hasOwnProperty(docId)) {

            var currentTerm,
                terms = db.documents[docId].terms,
                i = terms.length - 1,
                score = 0;

            for (; i >= 0; i--) {
                currentTerm = terms[i].toLowerCase();
                if (maxxDiffWords.hasOwnProperty(currentTerm)) {
                    score += maxxDiffWords[currentTerm];
                } //if
            } //for

            features[docId] = features[docId] || []; // Initialize array
            features[docId].push(
                score
            );
        }
    }
};
