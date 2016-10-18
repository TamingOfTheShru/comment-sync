var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require("path");
var movies = require('./routes/comments.route.js'); //routes are defined here
var app = express();
var controller = require("./controllers/comments.controller.js");
var Comments = require('mongoose').model('Comments');

app.set('port', process.env.PORT || 8000);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./'));

mongoose.connect('mongodb://localhost/test');

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/comment_form.html'));
});

app.post('/saveData', function(req, res) {
    controller.saveData(req, res)
});

app.get('/fetchData', function(req, res) {
    var email = req.query.email;
    Comments.findOne({ email: email }, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc != null) {
                var result = {
                    "email": email,
                    "comment": doc.comments,
                    "diff": doc.diff
                }
                res.send(result);
            } else {
                var result = {
                    "email": email,
                    "comment": "",
                    "diff": ""
                }
                res.send(result);
            }
        }
    })
})
