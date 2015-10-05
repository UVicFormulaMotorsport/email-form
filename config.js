var port = 8080;
var secret = 'ssshhhthisissupersecretstuff';

var config = function() {
    var getPort = function() {
        return port;
    }
    
    var getSecret = function() {
        return secret;
    }
    
    return {
        getPort: getPort,
        getSecret: getSecret
    }
}();

module.exports = config