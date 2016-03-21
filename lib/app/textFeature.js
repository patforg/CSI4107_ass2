var quoteRegEx = /\'/g;

/**
 * count the number of words that are all caps
 */
module.exports = function (headers, features) {

    var db = require('./db')();
    headers.push("@ATTRIBUTE sentence STRING");

    for (var docId in db.documents) {
        if (db.documents.hasOwnProperty(docId)) {

            features[docId] = features[docId] || []; // Initialize array
            features[docId].push(
                "'"+ db.documents[docId].text.replace(quoteRegEx,"\\'") +"'" 
            );
        }
    }
};
