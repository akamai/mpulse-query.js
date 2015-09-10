#!/usr/bin/env node
var program = require("commander");
var fs = require("fs");

program
    .version(JSON.parse(fs.readFileSync("./package.json", "utf-8")).version)
    .option("-u, --username <username>", "User name")
    .option("-p, --password <password>", "Password")
    .option("-t, --tenant <tenant>", "Tenant name")
    .option("-r, --repository <url>", "Repository URL")
    .option("-m, --mpulse <url>", "mPulse Query API URL")
    .option("-o, --output <file>", "Output file")
    .option("-v, --verbose", "Verbose debugging")
    .option("-a, --apikey", "API Key for queried domain");

// commands
program.command("query <type>")
    .description("query objects")
    .action(require("./cli/query.js"));

program.command("mpulse <type> <params>")
    .description("mPulse type parameters")
    .action(require("./cli/mpulse.js"));
// go
program.parse(process.argv);
