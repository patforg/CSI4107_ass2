module.exports = function (headers, features) {

    var db = require('./db')();
    headers.push("@ATTRIBUTE capitalizedWordCount NUMERIC");

    for (var docId in db.documents) {
        if(db.documents.hasOwnProperty(docId)){
            var terms = db.documents[docId].terms,
                capsWordCount = 0;

            for (var i = terms.length - 1; i >= 0; i--) {
                var currentTerm = terms[i];
                if (currentTerm === currentTerm.toUpperCase()) {
                    capsWordCount++;
                } //if
            } //for

            features[docId] = features[docId] || [];
            features[docId].push(
                capsWordCount
            );
        }
    }
};
