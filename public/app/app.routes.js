angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
    
        // login/home page route
        .when('/', {
            templateUrl  : 'app/views/pages/login.html',
            controller   : 'loginController',
            controllerAs : 'login'
        })
        
        // email form page route
        .when('/mailer', {
            templateUrl  : 'app/views/pages/mailer.html',
            controller   : 'mailController',
            controllerAs : 'mail'
        });
    
    $locationProvider.html5Mode(true);
});