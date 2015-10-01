"use strict";

var log = require("../lib/util/log");
var cmdCore = require("./core");
var fs = require("fs");

module.exports = function(type, params, options) {
    cmdCore.init(options);
    var properties;

    if (!options.parent.apikey) {
        log.error("--apikey (-a) is required!");
        process.exit(1);
    }

    try {
        properties = JSON.parse(params);
    }
    catch(exception) {
        log.error("Parsing parameters failed!");
        process.exit(1);
    }

    log.debug("Querying  for Type: " + type + " with params: " + params);

    cmdCore.connectToRepository(options, function(err, repo) {
        cmdCore.handleError(err);
        repo.setApiKey(options.parent.apikey);

        repo.mPulse(type, properties, function(err, result) {

            cmdCore.handleError(err);
            log.info(result);

        });
    });
};
