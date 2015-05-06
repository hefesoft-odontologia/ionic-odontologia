angular.module('starter')
    .factory('stripeService', ['$http','urlServicioFactory','$ionicLoading', '$q',
        function($http, urlServicioFactory, $ionicLoading, $q) {
    
    var urlBase = urlServicioFactory.getUrlService();
    var dataFactory = {};


    dataFactory.postTable = function (data) {        
        return $http.post(urlBase + "stripeCustomer", data);
    };


    dataFactory.cancelSubscription = function (data) {        
        return $http.post(urlBase + "stripeSubscription", data);
    };

    dataFactory.saveStorage = function (item){
        var deferred = $q.defer();
        $ionicLoading.show();
        dataFactory.postTable(item)
            .success(function (data) {
                $ionicLoading.hide();
                deferred.resolve(data);
            })
            .error(function (error) {
                console.log(error);
                $ionicLoading.hide();
                deferred.reject(error);
            });

        return deferred.promise;
    }  

    return dataFactory;
}]);