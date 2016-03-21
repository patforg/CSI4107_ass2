/**
 * count the number of words that are all caps
 */
module.exports = function (headers, features) {

    var db = require('./db')();

    headers.push("@ATTRIBUTE categoryNum NUMERIC");

    for (var docId in db.documents) {
        if (db.documents.hasOwnProperty(docId)) {
            var sentimentId = 0;
            switch (db.documents[docId].sentiment) {
                case 'negative':
                    sentimentId = 1;
                    break;
                case 'positive':
                    sentimentId = 2;
                    break;
                case 'neutral':
                    sentimentId = 3;
                    break;
                case 'objective':
                    sentimentId = 4;
                    break;
            } //switch
            features[docId] = features[docId] || []; // Initialize array
            features[docId].push(
               sentimentId 
            );
        }
    }
};
