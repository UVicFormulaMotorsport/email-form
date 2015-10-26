// Work in progress.
// Not currently call by anything so it can stay blank,
// without causing any issues.
angular.module('mailCtrl', [])

.controller('mailController', function($rootScope, $location, Mail) {
    var vm = this;
    vm.email = "";
    vm.recipients = "";
    
    vm.sendMail = function(){
        
        vm.error = '';
        
        if(vm.email != null && vm.recipients != null) {
            //Spliting the recipients string into an array.
            //Each entry is "name:email@domain.com"
            //This will be split again later before sending.
            var recipients = vm.recipients.split(/\r?\n/);
            Mail.send(vm.email, recipients)
            .success(function(data) {
                if(data.success) {
                    vm.success = true;
                }
                else {
                    vm.success = false;
                    vm.error = data.message;
                    vm.errorMsg = 'Failed to send emails.';
                }
            })
        }
    };
})
