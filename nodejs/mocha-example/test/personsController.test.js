var personsController = require('../components/personsController');
var assert = require('assert');

describe("persons tests", function() {
    var people = [];
    people.push(new personsController.person("Morty","Smith",14,"brown"));
    people.push(new personsController.person("Rick","Sanchez",70,"blue"));
    it("returns min age of persons", function minAgeTest() {
        assert(14 === personsController.min_age(people));
        assert.notEqual(70 === personsController.min_age(people));
    });
    it("returns max age of persons", function maxAgeTest() {
        assert(70 === personsController.max_age(people));
        assert.notEqual(14 === personsController.max_age(people));
    });
});