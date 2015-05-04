angular.module('starter')
.controller("impresionOdontogramaCtrl", ['$scope','dataTableStorageFactory', 'validarNavegacionService', 'varsFactoryService', 'users', 'piezasService',
    function ($scope, dataTableStorageFactory, validarNavegacionService, varsFactoryService, users, piezasService) {

	$scope.items = [];    

    $scope.imprimir = function(){
        window.print();
    }

    function load(data){
        $scope.items =piezasService.getAllTratamientos();         
    }

    load();
   
}]);
