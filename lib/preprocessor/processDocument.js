var termProcessor = require('./termProcessor');
var fs = require('fs');

//from: http://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
var urlEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
/**
 * Filter out empty terms
 * will only keep terms when callback(true) is called
 */
var filterEmptyTerms = function (term) {
    return term !== '';
};

var data = fs.readFileSync(__dirname + '/../../data/slang.txt','utf-8');
data.replace(/\r/g,'');
var slang = {};
data.split('\n').forEach(function(term){
    if(term) {
        // Remove extra spaces
        var terms = term.split("\t")
        slang[terms[0]] = terms[1].split(/\s|\,/).filter(filterEmptyTerms);
    }
});

// get list of urls that title
// has been retreived
var urls = {};
var data = fs.readFileSync(__dirname + '/../../data/urlTitles.txt','utf-8');
data.replace(/\r/g,'');
data.split('\n').forEach(function(line){
    if(line) {
        var parts = line.split("\t");
        urls[parts[0]] = parts[1];
    }
});


module.exports = function (doc) {
    var text = doc.text;
    // remove URLs
    var matches = text.match(urlEx);
    if(matches) {
        var url = matches[0];

        // add text from title to doucment text if  it exists
        if (urls.hasOwnProperty(url)) {
            text += " " + urls[url];
        } //if
        text = text.replace(urlEx, matches[0].replace(/\/|-|\.|\?|:|http|https|www/g, " ")); //explode url into parts
    } //if

    var hash = /#(\w+)\W?/g;
    matches = text.match(hash);
    if(matches)
        text = text.replace(hash, "$1 #$1 ");

    doc.terms = text.split(/\s/).map(termProcessor).filter(filterEmptyTerms).reduce(function(prec, curr){
        if(slang[curr.toLowerCase()]) {
            return prec.concat(slang[curr.toLowerCase()]);
        } else
            prec.push(curr);
        return prec;
    }, []);
};

