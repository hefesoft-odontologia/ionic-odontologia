angular.module('starter')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $cordovaPush, pushFactory, messageService, connectionMode) {
  
	$scope.$on('Cambio de conexion', function(){        
         var isOnline = args.Online;

         if(isOnLine){
         	//messageService.showMessage("Con conexion");	
         }
         else{
         	messageService.showMessage("Sin conexxion a internet");	
         }
    });
})

