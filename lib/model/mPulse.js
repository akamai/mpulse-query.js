"use strict";

var log = require("../util/log"),
    constants = require("../constants"),
    Repository = require("soasta-repository").Repository;

/**
 * @namespace SOASTA
 * @desc
 * SOASTA Root Namespace containing all other classes
 */

var SOASTA = {
    /**
     * @constructor mPulse
     * @memberof SOASTA
     * @desc
     * mPulse class to interact with mPulse API
     *
     * _NOTE:_ Since this is based off of and depends on `soasta-repository` you can
     * also call all of the RepositoryService calls from this  class/library.
     * See the [RepositoryService package for more information]{@link https://github.com/SOASTA/repository.js}
     *
     * @param {string} APIKey - APIKey for the application
     * @param {string} [QueryURL] - mPulse Query API endpoint URL
     * @param {string} [RepositoryURL] - SOASTA RepositoryService API endpoint URL
     *
     * @tutorial mPulseClass
     */
    mPulse: function mPulse() {
        var repositoryUrl, queryUrl, apiKey;

        // guard ourselves against instantiation with not all the results
        if (arguments.length === 1) {
            apiKey = arguments[0];
            queryUrl = constants.QUERY_URL;
            repositoryUrl = constants.REPOSITORY_URL;
        } else if (arguments.length === 2) {
            apiKey = arguments[0];
            queryUrl = arguments[1];
            repositoryUrl = constants.REPOSITORY_URL;
        } else if (arguments.length === 3) {
            apiKey = arguments[0];
            queryUrl = arguments[1];
            repositoryUrl = arguments[2];
        }

        Repository.call(this, repositoryUrl);

        var Query = require("./Query.js");
        var query = new Query(queryUrl, apiKey);

	this.Query = query;
        var self = this;

        this.query = function(type, props, callback) {
            self.Query.run(self.token, type, props, callback);
        };

	this.setApiKey = function(apiKey) {
	    self.query = new Query(queryUrl, apiKey);
	};

        this.asPromises = function(Promises) {
            var promisesMPulse = new mPulse(apiKey, queryUrl, repositoryUrl);

            for (var name in promisesMPulse) {
                if (promisesMPulse.hasOwnProperty(name)) {
                    var func = promisesMPulse[name];

                    if (typeof func === "function" && name !== "asPromises") {
                        log.debug("Replacing function " + name + " with promise-ified version.");
                        func = Promises.denodeify(func);
                        promisesMPulse[name] = func;
                    }
                }
            }
            return promisesMPulse;
        }
    }
}

module.exports = SOASTA;
