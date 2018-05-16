var dict = require('../components/dict');
var assert = require('assert');

describe("app tests", function() {
    var people = [{first_name:"Morty",last_name:"Smith",age:14},{first_name:"Rick",last_name:"Sanchez",age:70}]
    it("returns min age of persons", function minAgeTest() {
        assert(14 === dict.min_age(people));
        assert.notEqual(70 === dict.min_age(people));
    });
    it("return max age of persons", function maxAgeTest() {
        assert(70 === dict.max_age(people));
        assert.notEqual(14 === dict.max_age(people));
    });
});