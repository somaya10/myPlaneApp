
// Packages
var express    = require('express');        // call express
var path = require('path');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var basicAuth = require('basic-auth');
var app        = express();                 // define the app using express
var bodyParser = require('body-parser');


var mongoose   = require('mongoose');

// Connect to the db
mongoose.connect("mongodb://35.184.220.103:30665/flightplan", function(err, db) {
  if(!err) {
    console.log("We are connected to the database");
  }
});

// Basic Authentication
var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === 'myPlaneApp' && user.pass === 'ProjectPlaneMeConnect1101') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}

// Prometheus API metrics
const apiMetrics = require('prometheus-api-metrics');
app.use(apiMetrics());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set the port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    console.log('API Call on the way! ');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', auth, function(req, res) {
    res.json({ message: 'Welcome to the Flight Plan API!' });
});

app.use('/v1', auth, router);


var flights = require('./routes/flights');
app.use('/v1/flights', auth, flights);


app.listen(port);
console.log('Listening on port ' + port);
