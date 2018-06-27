"use strict";
/* global describe,it */

var assert = require("assertive-chai").assert;

var REQUIRE_PATH = "../../lib/model/mPulse.js";

describe("mPulse Initialization Tests", function() {
    it("Should require without an error", function() {
        require(REQUIRE_PATH);
    });

    it("Should initialize without an error", function() {
        var SOASTA = require(REQUIRE_PATH);
        var mPulse = new SOASTA.mPulse();

        assert.isObject(mPulse);
        assert.instanceOf(mPulse, SOASTA.mPulse);
    });
});
