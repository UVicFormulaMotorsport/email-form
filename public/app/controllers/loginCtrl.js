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
        
        // call the Auth.login() function
        Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data) {
            // if a user successfully logs in, redirect to mailer page
            $location.path('/mailer');
        });
    };
    
    // function to handle logging out
    vm.doLogout = function() {
        Auth.logout();
        // reset all user info
        $location.path('/login');
    };
});