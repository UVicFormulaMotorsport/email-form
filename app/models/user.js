var bcrypt = require('bcrypt-nodejs');

// how these values are stored should probably be changed...
var nhash  = bcrypt.hashSync("admin");
var phash  = bcrypt.hashSync("password");

var User = function() {
    // verify the given username.
    var compareUsername = function(username) {
        return bcrypt.compareSync(username, nhash)
    }
        
    // verify the given password.
    var comparePassword = function(password) {
        return bcrypt.compareSync(password, phash)
    }
    
    return {
        compareUsername: compareUsername,
        comparePassword: comparePassword
    }
}();

module.exports = User;