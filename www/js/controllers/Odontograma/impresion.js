angular.module('starter')
.controller("impresionOdontogramaCtrl", ['$scope','dataTableStorageFactory', 'validarNavegacionService', 'varsFactoryService', 'users', 'piezasService', '$state', 'leerOdontogramaServices', '$ionicLoading',
    function ($scope, dataTableStorageFactory, validarNavegacionService, varsFactoryService, users, piezasService, $state, leerOdontogramaServices, $ionicLoading) {
    var pacienteId = $state.params.pacienteId;
    var userId = $state.params.userId;

	$scope.items = [];    

    $scope.imprimir = function(){
        window.print();
    }

    $scope.$on('Odontograma cargado', function(event, args){      
        $scope.items = [];
        $ionicLoading.hide();
        $scope.items =piezasService.getAllTratamientos();
        $ionicLoading.hide();
    });

    function load(data){
    	var usuario = {username : userId};
	    $ionicLoading.show();
		leerOdontogramaServices.load(usuario, pacienteId);
    }

    load();
   
}]);
