process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    routes = require('./config/routes'),
    passport = require('./config/passport');
    

var db = mongoose(),
    app = express(),
    routes = routes(app),
    passport = passport();
    
app.listen(config.port || 3000);
module.exports = app;
console.log('Server running at http://localhost:' + config.port);
