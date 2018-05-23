//Load express module with `require` directive
var express = require('express')
var app = express()
var math = require('./components/math');

var port = 8080;

//Request response for root
app.get('/', function (req, res) {
  res.send('Hello World')
})

// Listen on port
app.listen(port, function () {
  console.log('App listening on port ' + port);
})