var math = require('../components/math');
var assert = require('assert');

describe("app tests", function() {
    it("returns sum", function sumTest() {
        assert(5 === math.sum(2,3));
        assert(5.5 === math.sum(2.3,3.2));
        assert.notEqual(1 === math.sum(2,3));
    });
});