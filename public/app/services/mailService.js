angular.module('mailService', [])

.factory('Mail', function($http) {
    
    // create mail factory object
    var mailFactory = {};
    
    // handle sending mail
    mailFactory.send = function(subject, email, recipients) {
        
        // return the promise object and its data
        return $http.post('/api/mailer', {
            subject:    subject,
            email:      email, 
            recipients: recipients
        })
        .success(function(data) {
            return true;
        });
    };
    
    // return mail factory object
    return mailFactory;
});