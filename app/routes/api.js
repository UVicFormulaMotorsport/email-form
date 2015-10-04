var user   = require('../models/user');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

    var apiRouter = express.Router();
    
    // route for login authentication.
    apiRouter.post('/authenticate', function(req, res) {
        console.log(req.body.username);

        var validUsername = user.compareUsername(req.body.username)
        if(!validUsername) {
            res.json({
                success: false,
                message: 'Authentication failed. Username is incorrect.'
            });
        }
        else {
        
            var validPassword = user.comparePassword(req.body.password)
            if(!validPassword) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Password is incorrect.'
                });
            }
            else {
                var token = jwt.sign(user, superSecret, {
                    expiresInMinutes: 300 // expires in 5 hours
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
    
    return apiRouter;
};
