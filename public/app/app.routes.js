angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    
    $routeProvider
    
    // login/home page route
    .when('/', {
        templateUrl  : 'app/views/pages/login.html',
        controller   : 'loginController',
        controllerAs : 'login'
    });
    
    // get rid of the hash in the URL
    $locationProvider.html5Mode(true);
});