var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
// var <modelName> = require('./models/<modelName>');
var app = express();

app.use(express.static(path.join(__dirname, 'static')));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/movie', require('./controllers/movies'));

// mongoose.connect('/mongodb://localhost/subtitles');

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.listen(3000);
