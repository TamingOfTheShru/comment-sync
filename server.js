process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var movies = require('./routes/movies'); //routes are defined here
var app = express(); //Create the Express app

app.listen(config.port || 3000);
module.exports = app;
console.log('Server running at http://localhost:' + config.port);
