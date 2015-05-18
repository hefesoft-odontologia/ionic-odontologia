angular.module('starter')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $cordovaPush, $state, pushFactory, messageService, connectionMode, varsFactoryService, users) {
  
	$scope.inicial = function(){
		var paciente = varsFactoryService.pacienteSeleccionado();
        varsFactoryService.setTipoOdontograma("Inicial");

        $state.go("odontograma.odontogramaControl", { "pacienteId": paciente});
	}

    $scope.planTratamiento = function(){
        var paciente = varsFactoryService.pacienteSeleccionado();
        varsFactoryService.setTipoOdontograma("Plan de tratamiento");

        $state.go("odontograma.odontogramaControl", { "pacienteId": paciente});
    }

    $scope.evolucion = function(){
        var paciente = varsFactoryService.pacienteSeleccionado();
        varsFactoryService.setTipoOdontograma("Evolucion");

        $state.go("odontograma.odontogramaControl", { "pacienteId": paciente});
    }


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

