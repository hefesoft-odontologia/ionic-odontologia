/*
    Se utiliza para pasar el token en el header de autenticacion
*/

angular.module('starter')
.factory('authInterceptorService', ['$q', '$location', '$localstorage', 'messageService', 
    function ($q, $location, localStorageService, messageService) {
 
    var authInterceptorServiceFactory = {};
 
    var _request = function (config) {
        
        var isOnline = navigator.onLine;

        if(isOnline){
            config.headers = config.headers || {};
     
            
            var authData = localStorageService.getObject('authorizationData');
            if (authData) {
                config.headers.Authorization = authData.access_token;             
            }
        }
        else{
            messageService.showMessage("No se ha encontrado una conexion a internet activa");
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