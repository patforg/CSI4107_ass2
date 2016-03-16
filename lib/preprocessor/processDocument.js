var natural = require('natural');
var termProcessor = require('./termProcessor');

//from: http://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
var urlEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
/**
 * Filter out empty terms
 * will only keep terms when callback(true) is called
 */
var filterEmptyTerms = function (term) {
    return term !== '';
};

module.exports = function (doc) {
    var text = doc.text;
    // remove URLs
    text = text.replace(urlEx, '');
    doc.terms = text.split(/\s|\,/).map(termProcessor).filter(filterEmptyTerms);
};

