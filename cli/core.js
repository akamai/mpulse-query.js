"use strict";

var fs = require("fs");

var log = require("../lib/util/log");
var constants = require("../lib/constants");
var SOASTA = require("../lib/model/mPulse.js");
var CLI = require("soasta-repository").CLI;

Object.keys(CLI).forEach(function(functionName) {
    exports[functionName] = CLI[functionName];
});

/**
 * Initializes the command-line interface
 *
 * @param {object} options Options
 */
exports.init = function(options) {
    log.transports.console.json = options.parent.json;
    CLI.init.call(null, options);

    if (!options.parent.mpulse) {
        options.parent.mpulse = constants.QUERY_URL;
    }
};

/**
 * Connects to the SOASTA repository and return when Connected
 *
 * @param {object} options Options
 * @param {function(err, repo)} callback Callback
 */
exports.connectToRepository = function(options, callback) {
    var repo = new SOASTA.mPulse(options.parent.apikey, options.parent.mpulse, options.parent.repository);
    repo.connect(options.parent.tenant, options.parent.username, options.parent.password, function(err) {
        return callback && callback(err, repo);
    });
}
