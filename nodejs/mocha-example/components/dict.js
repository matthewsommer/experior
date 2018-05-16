exports.min_age = function (data) {
    return data.reduce((min, p) => p.age < min ? p.age : min, data[0].age);
}

exports.max_age = function (data) {
    return data.reduce((max, p) => p.age > max ? p.age : max, data[0].age);
}