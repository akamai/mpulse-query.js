#!/usr/bin/env node
var SOASTA = require("soasta-repository");
var program = SOASTA.cmd;

program
    .option("-m, --mpulse <url>", "mPulse Query API URL")
    .option("-a, --apikey <apikey>", "API Key for queried domain");

program.command("mpulse-query <type> <params>")
    .description("mPulse type parameters")
    .action(require("./cli/mpulse.js"));

program.parse(process.argv);
