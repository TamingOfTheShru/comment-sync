var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var path    = require("path");
var movies = require('./routes/comments.route.js'); //routes are defined here
var app = express(); 
var controller = require("./controllers/comments.controller.js");
//Create the Express app

//var app = require('../app'); //Require our app

app.set('port', process.env.PORT || 8000);

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/test');

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

app.get('/',function(req,res){  
     res.sendFile(path.join(__dirname+'/comment_form.html'));
});


app.post('/submit',function(req,res){  
    controller.getData(req,res)
});

