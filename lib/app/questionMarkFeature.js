var questionRegEx = /\?/g;

/**
 * count the number of words that are all caps
 */
module.exports = function (headers, features) {

    var db = require('./db')();
    headers.push("@ATTRIBUTE question NUMERIC");

    for (var docId in db.documents) {
        if (db.documents.hasOwnProperty(docId)) {

            var questionMatch = db.documents[docId].text.match(questionRegEx);

            features[docId] = features[docId] || []; // Initialize array
            features[docId].push(
                (questionMatch ? questionMatch.length : 0)
            );
        }
    }
};
