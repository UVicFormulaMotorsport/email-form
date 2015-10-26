angular.module( 'MassMailer', ['app.routes','authService','loginCtrl', 'mailService', 'mailCtrl'])
            
.config(function($httpProvider) {
	
	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');
});