angular.module('starter')
.controller("impresionOdontogramaCtrl", ['$scope','dataTableStorageFactory', 'validarNavegacionService', 'varsFactoryService', 'users',
    function ($scope, dataTableStorageFactory, validarNavegacionService, varsFactoryService, users) {

	$scope.items = [];
    validarNavegacionService.validarPacienteSeleccionado();

    $scope.imprimir = function(){
        window.print();
    }

    function obtenerTratamientos(){
        var usuario = users.getCurrentUser(); 
        var paciente = varsFactoryService.pacienteSeleccionado();

        dataTableStorageFactory.getTableByPartition('TpOdontograma',  usuario.username + "paciente" + paciente)
        .success(success)
        .error(error);
    }

    function success(data){
        $scope.items = data;        
    }

    function error(error){
        console.log(error);
    }

    obtenerTratamientos();
   
}]);
