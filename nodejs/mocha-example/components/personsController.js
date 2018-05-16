exports.person = function Person(firstName, lastName, age, eyeColor) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.eyeColor = eyeColor;
}

exports.min_age = function (data) {
    return data.reduce((min, p) => p.age < min ? p.age : min, data[0].age);
}

exports.max_age = function (data) {
    return data.reduce((max, p) => p.age > max ? p.age : max, data[0].age);
}