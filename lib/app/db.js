/**
 * function that returns the db
 */
var db = {
    // total number of documents (N)
    documentCount: 0,

    //total number of terms
    termCount: 0,

    //collection of documents
    documents: {},

};

module.exports = function (newDB) {
    if (typeof newDB !== 'undefined') {
        db = newDB
    } //if
    return db;
};

