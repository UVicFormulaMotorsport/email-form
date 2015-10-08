angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
    
        // login/home page route
        .when('/', {
            templateUrl  : 'app/views/pages/login.html',
            controller   : 'loginController',
            controllerAs : 'login'
        })
        
        .when('/mailer', {
            templateUrl  : 'app/views/pages/mailer.html',
        });
    
    $locationProvider.html5Mode(true);
});