/* eslint-env node */

/**
 * @namespace BuildConfiguration
 * @desc
 * Documents the constants used during build and compilation as builtin
 * compilation and build configuration documentation
 *
 * The build is executed through Grunt the generic taskrunner.
 */

/**
 * @constant mochaTestFiles
 * @memberof BuildConfiguration
 * @type {String[]}
 * @desc
 * Array of files to use to run the Unittests on the code base
 */
var mochaTestFiles = [
    "tests/**/*.js"
];

/**
 * @constant sourcePaths
 * @memberof BuildConfiguration
 * @type {string[]}
 * @desc
 * A list of all paths to javascript files
 */
var sourcePaths = [
    "./cli/**/*.js",
    "./lib/**/*.js",
    "./Gruntfile.js",
    "./tests/**/*.js"
];

module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        eslint: {
            console: {
                options:{
                    "format": "compact"
                },
                src: sourcePaths
            },
            build: {
                options: {
                    outputFile: "eslint.xml",
                    format: "jslint-xml",
                    silent: true
                },
                src: sourcePaths
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: "spec",
                    clearRequireCache: true
                },
                src: mochaTestFiles
            },
            build: {
                options: {
                    reporter: "tap",
                    captureFile: "tests/mocha.tap",
                    clearRequireCache: true
                },
                src: mochaTestFiles
            }
        }
    });

    //
    // Plugins
    //
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("gruntify-eslint");

    //
    // Tasks
    //
    grunt.registerTask("test", ["mochaTest:test"]);
    grunt.registerTask("test:build", ["mochaTest:build"]);

    grunt.registerTask("lint", ["eslint:console"]);
    grunt.registerTask("lint:build", ["eslint:build"]);

    //
    // Task Groups
    //
    grunt.registerTask("default", ["lint", "test"]);
    grunt.registerTask("build", ["lint:build", "test:build"]);
};
