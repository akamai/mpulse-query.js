"use strict";

var assert = require("assertive-chai").assert;

var REQUIRE_PATH = "../../lib/model/mPulse.js";
var API_KEY = "ABC-123";

describe("mPulse Initialization Tests", function() {
    it("Should initialize without an error", function() {
        var SOASTA = require(REQUIRE_PATH);
        var mPulse = new SOASTA.mPulse(API_KEY);

        assert.isObject(mPulse);

        assert.instanceOf(mPulse, SOASTA.mPulse);
    });
});
