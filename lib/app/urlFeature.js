//from: http://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
var urlEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

/**
 * count the number of words that are all caps
 */
module.exports = function (headers, features) {

    var db = require('./db')();
    headers.push("@ATTRIBUTE urlPresent NUMERIC");

    for (var docId in db.documents) {
        if (db.documents.hasOwnProperty(docId)) {

            var exclamationMatch = db.documents[docId].text.match(urlEx);

            features[docId] = features[docId] || []; // Initialize array
            features[docId].push(
                (exclamationMatch ? 1 : 0)
            );
        }
    }
};
