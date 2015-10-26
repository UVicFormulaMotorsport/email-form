angular.module('mailService', [])

.factory('Mail', function($http) {
    
    // create auth factory object
    var mailFactory = {};
    
    // handle sending mail
    mailFactory.send = function(email, recipients) {
        // return the promise object and its data
        return $http.post('/api/mailer', {
            email: email, 
            recipients: recipients
        })
        .success(function(data) {
            return true;
        });
    };
    
        
    // return mail factory object
    return mailFactory;
});