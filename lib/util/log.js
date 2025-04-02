"use strict";

var winston = require("winston");

var isDebug = process.env.DEBUG;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: isDebug ? "debug" : "info"
        })
    ]
});

// set log levels
logger.setLevels({
    emerg: 7,
    alert: 6,
    crit: 5,
    error: 4,
    warning: 3,
    notice: 2,
    info: 1,
    debug: 0
});

module.exports = logger;
