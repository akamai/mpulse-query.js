"use strict";

//
// Imports
//
var fs = require("fs");
var _ = require("lodash");

var log = require("../lib/util/log");
var constants = require("../lib/constants");
var SOASTA = require("../lib/model/mPulse.js");

//
// Exports
//
/**
 * Initializes the command-line interface
 *
 * @param {object} options Options
 */
exports.init = function(options) {
    if (options && options.parent && options.parent.verbose) {
        log.transports.console.level = "debug";
    }

    if (fs.existsSync("auth.json")) {
        // read in auth info
        var authContents = fs.readFileSync("auth.json", "utf-8");
        var auth = JSON.parse(authContents);

        // use auth contents as fallback
        options.parent = _.merge({}, auth, options.parent);
    }

    // use defaults for repository
    if (!options.parent.repository) {
        options.parent.repository = constants.REPOSITORY_URL;
    }

    if (!options.parent.mpulse) {
        options.parent.mpulse = constants.QUERY_URL;
    }

    console.log(options.parent);

    // ensure username and password have been specified
    if (!options.parent.username) {
        log.error("--username (-u) is required");
        process.exit(1);
    }

    if (!options.parent.password) {
        log.error("--password (-p) is required");
        process.exit(1);
    }

    if (!options.parent.apikey) {
        log.error("--apikey (-a) is required!");
        process.exit(1);
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