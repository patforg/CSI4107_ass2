var fs = require('fs');
var termProcessor = require('./../preprocessor/termProcessor');

var exclamationRegEx = /\!/g;

/**
 * count the number of words that are all caps
 */
module.exports = function (headers, features) {

    var db = require('./db')();

    var dictionary = {};
    var index = 0;
    var i;

    //for (var docId in db.documents) {
    //    if (db.documents.hasOwnProperty(docId)) {
    //        var doc = db.documents[docId];
    //        for (i = 0; i < doc.terms.length; i++)
    //            dictionary[doc.terms[i]] = dictionary[doc.terms[i]] || index++;
    //    }
    //}

    // For now, let's only use those words which we know have sentiment attached
    var data = fs.readFileSync(__dirname + '/../../data/maxdiff.txt','utf-8');
    data.split('\r\n').forEach(function(line){
        if(line) {
            var word = termProcessor(line.split("\t")[1]).replace(/[^a-zA-Z]/g, "");
            dictionary[word] = dictionary[word] || index++;
        }
    });

    for (var term in dictionary) {
        if (dictionary.hasOwnProperty(term)) {
            headers.push("@ATTRIBUTE bow" + term + " NUMERIC");
        }
    }

    for (docId in db.documents) {
        if (db.documents.hasOwnProperty(docId)) {

            features[docId] = features[docId] || []; // Initialize array

            var termIndex = db.documents[docId].terms.map(function(term) {return dictionary[term.replace(/[^a-zA-Z]/g, "")];}).filter(function(term){return term >= 0});
            for(i = 0; i < index; i++)
                features[docId].push(termIndex[i]? 1: 0);
        }
    }
};
