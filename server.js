var config  = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var morgan  = require('morgan');
var app     = express();
var path    = require('path');

// APP CONFIGURATION
// =================================================================================

// body parser is for grabbing info from POST requests.
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// configuring app to handle CORS requests.
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',
                  '*');
    res.setHeader('Access-Control-Allow-Methods',
                  'GET, POST');
    res.setHeader('Access-Control-Allow-Origin',
                  'X-Requested-With, content-type, Authorization');
    next();
});

// logging requests to the console for debuging purposes.
app.use(morgan('dev'));

// setting static file locations for frontend.
app.use(express.static(__dirname + '/public'));

// API ROUTES
// =================================================================================
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE
// =================================================================================
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// I'MA FIRING THE SERVER!
// =================================================================================
app.listen(config.port)
console.log('The answer to life the universe and everything is: ' + config.port);
