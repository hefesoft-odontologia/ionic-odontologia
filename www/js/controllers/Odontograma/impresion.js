angular.module('starter')
.controller("impresionOdontogramaCtrl", ['$scope','dataTableStorageFactory', 'validarNavegacionService', 'varsFactoryService', 'users', 'piezasService', '$state', 'leerOdontogramaServices', '$ionicLoading',
    function ($scope, dataTableStorageFactory, validarNavegacionService, varsFactoryService, users, piezasService, $state, leerOdontogramaServices, $ionicLoading) {
    var pacienteId = $state.params.pacienteId;
    var userId = $state.params.userId;

	$scope.items = [];    

    $scope.imprimir = function(){
        window.print();
    }

    function load(data){
    	var usuario = {username : userId};
	    $ionicLoading.show();
		leerOdontogramaServices.load(usuario, pacienteId).then(function(data){       
	        $scope.items = [];
	        $scope.items =piezasService.getAllTratamientos();
	        $ionicLoading.hide();
		});         
    }

    load();
   
}]);
