var repeatingLetter = /(.)\1{3,}/g;

/**
 * count the number of words that are all caps
 */
module.exports = function (headers, features) {

    var db = require('./db')();
    headers.push("@ATTRIBUTE repeatingLetter NUMERIC");

    for (var docId in db.documents) {
        if (db.documents.hasOwnProperty(docId)) {

            var exclamationMatch = db.documents[docId].text.match(repeatingLetter);

            features[docId] = features[docId] || []; // Initialize array
            features[docId].push(
                (exclamationMatch ? exclamationMatch.length : 0)
            );
        }
    }
};
