var natural = require('natural');
var fs = require('fs');

// regex to remove unwanted chars 
// only if at begining or end of term
var replaceReg = /^[!:;,.\-\'\"]|[!:;,.\-\'\"]$/g;
var removePunctuation = function (term) {
    return term.replace(replaceReg, '');
};

//remove hash from hashtags
var hashReg = /^#{1}/;
var hashRemove = function (term) {
    return term.replace(hashReg, '');
};

var stem = function (term) {
    return natural.LancasterStemmer.stem(term);
};


// Read all the stopwords
var stopWords = {};
var data = fs.readFileSync(__dirname + '/../../data/stopwords.txt','utf-8');
data.split('\n').forEach(function(term){
    if(term) {
        // Remove extra spaces
        var cleanedTerm = term.toLowerCase().replace(/^\s+|\s+$/g, '');
        stopWords[cleanedTerm] = true;
    }
});

// replace stop words with empty term
var filterStopWords = function(term) {
    if (stopWords.hasOwnProperty(term)) {
        return '';
    } //if
    return term;
};

// export termProcessor function
module.exports = function (term) {
//    term = removePunctuation(term);
    term = hashRemove(term);
    term = filterStopWords(term);
    term = stem(term);

    return term;
};
