//Load express module with `require` directive
var express = require('express')
var app = express()
var math = require('./components/math');

var port = 8080;

//Set view engine to EJS
app.set('view engine', 'ejs');

//Request response for root
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/helloworld', function(req, res) {
    res.render('helloworld');
});

// Listen on port
app.listen(port, function () {
  console.log('App listening on port ' + port);
})