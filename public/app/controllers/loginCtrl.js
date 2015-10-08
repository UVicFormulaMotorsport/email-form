angular.module('loginCtrl', [])

.controller('loginController', function($rootScope, $location, Auth) {

    var vm = this;
    
    // get info if a person is logged in
    vm.loggedIn = Auth.isLoggedIn();
    
    // check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function() {
        vm.loggedIn = Auth.isLoggedIn();
    });
    
    // function to handle login form
    vm.doLogin = function() {
        
        vm.error = '';
        
        // Check that a username and password was entered
        if(vm.loginData.username != null && vm.loginData.password != null) {
        
            // call the Auth.login() function
            Auth.login(vm.loginData.username, vm.loginData.password)
            .success(function(data) {
                if(data.success) {
                    vm.loggedIn = true;
                    $location.path('/mailer');
                }
                else {
                    vm.error = data.message;
                    vm.errorMsg = 'Username or password is incorrect';
                }
            })
        }
        else {
            vm.errorMsg = 'Username and Password are required';
        }
    };
    
    // function to handle logging out
    vm.doLogout = function() {
        Auth.logout();
        vm.loggedIn = false;
        vm.error = '';
        
        // reset all user info
        $location.path('/login');
    };
});