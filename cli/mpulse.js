"use strict";

var log = require("../lib/util/log");
var cmdCore = require("./core");
var fs = require("fs");

module.exports = function(type, params, options) {
    cmdCore.init(options);
    log.debug(params);
};
