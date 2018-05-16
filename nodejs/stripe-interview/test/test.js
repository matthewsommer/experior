var assert = require('assert');
describe('app', function() {
    var app;
    beforeEach(function () {
        app = require('../app');
    });
    it('returns added numbers', function testAddition() {
        assert(5 === app.sum(2,3));
    });
});