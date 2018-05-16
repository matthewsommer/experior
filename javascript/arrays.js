var int_array = [5,2,3,4,3,2,6];
var object_array = [{"first_name":"Matt","last_name":"Sommer", "age":34},{"first_name":"Rick","last_name":"Sanchez","age":79},{"first_name":"Morty","last_name":"Smith","age":15}]

//Array Length
console.log(int_array.length);

//Array Element
console.log(int_array[0]);

//Array For loop
var i; //improves performance
var l = int_array.length //improves performance
for (i = 0; i < l; i++) {
    console.log(int_array[i]);
}

//Array For/In loop of objects
for (x in object_array) {
    console.log(`${object_array[x].first_name} ${object_array[x].last_name}`)
}

//Array Sort
console.log(int_array.sort());

//Array Add
int_array.push(7);
console.log(int_array);

function sum(a,b) {
    return a + b;
}

//Sum
console.log(sum(...int_array));

//Array determine if is array
console.log(int_array instanceof Array);

//Array min
var min = Math.min(...int_array);
console.log(min);

//Array max
var max = Math.max(...int_array);
console.log(max);

//Array dict min
var min_age = Math.min(...int_array);