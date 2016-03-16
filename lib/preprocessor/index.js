/**
 * Module with preprocessor methods
 */
var processDocument = require('./processDocument');

module.exports = (function () {
    // expose module's public api
    return {
        "processDocument": processDocument
    }
})();
