var User       = require('../models/user');
var config     = require('../../config');
var jwt        = require('jsonwebtoken');
var crypto     = require('crypto');
var nodemailer = require('nodemailer');
var async      = require('async');

var superSecret = String(config.secret);

module.exports = function(app, express) {

    var apiRouter = express.Router();
    
    // route for login authentication.
    apiRouter.post('/authenticate', function(req, res) {
        console.log(req.body.username);

        var validUsername = User.compareUsername(req.body.username)
        if(!validUsername) {
            res.json({
                success: false,
                message: 'Authentication failed. Username is incorrect.'
            });
        }
        else {
        
            var validPassword = User.comparePassword(req.body.password)
            if(!validPassword) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Password is incorrect.'
                });
            }
            else {
                var token = jwt.sign(User, superSecret, {
                    expiresIn: 18000 // expires in 5 hours
                });
                
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
    
    // route middleware to verify a token
    apiRouter.use(function(req, res, next) {
        // Just some logging
        console.log('Somebody is using Mass-Mailer');
        
        // check header or url parameters or post parameters for token
        var token = req.body.token || 
                    req.param('token') || 
                    req.headers['x-access-token'];
        
        // Time to decode the token
        if(token) {
            jwt.verify(token, superSecret, function(err, decoded) {
                if(err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token'
                    });
                }
                else {
                    req.decoded = decoded;
                    next() // going back to the route that called us
                }
            });
        }
        else {
            // The user doesn't have a token, so forbid access to the page.
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
    
    // route for sending all the emails.
    apiRouter.post('/mailer', function(req, res) {
        console.log("Mail made it to the API!");
        console.log(req.body.subject);
        console.log(req.body.email);
        console.log(req.body.recipients);
    });
    
    return apiRouter;
};
