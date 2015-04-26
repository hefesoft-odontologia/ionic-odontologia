/*
    Se utiliza para pasar el token en el header de autenticacion
*/

angular.module('starter')
.factory('authInterceptorService', ['$q', '$location', '$localstorage', function ($q, $location, localStorageService) {
 
    var authInterceptorServiceFactory = {};
 
    var _request = function (config) {
 
        config.headers = config.headers || {};
 
        
        var authData = localStorageService.getObject('authorizationData');
        if (authData) {
            config.headers.Authorization = authData.access_token;             
        }
        
 
        return config;
    }
 
    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }
 
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
 
    return authInterceptorServiceFactory;
}]);