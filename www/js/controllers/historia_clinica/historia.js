angular.module('starter')
.controller('historiaCtrl', ['$scope', 'dataTableStorageFactory', '$ionicLoading', 'messageService', 'users', '$q', 'varsFactoryService', 'validarNavegacionService',
	function ($scope, dataTableStorageFactory, $ionicLoading, messageService, users, $q, varsFactoryService, validarNavegacionService) {	
	
	var usuario = users.getCurrentUser();
	var paciente = varsFactoryService.pacienteSeleccionado();	
	validarNavegacionService.validarPacienteSeleccionado();
	$scope.Datos = {};


	$scope.save = function(){

		//Se saca el rowkey del paciente que es su identificador
		$scope.Datos['PartitionKey'] = paciente.RowKey;		
		if(angular.isUndefined($scope.Datos.RowKey)){
			$scope.Datos['generarIdentificador'] = true;
		}

		$scope.Datos['nombreTabla']= 'TmHistoriaPaciente';

		dataTableStorageFactory.saveStorage($scope.Datos)
		.then(function(data){
			messageService.showMessage("Guardado");
		});
	}

	function load(){		

        var p1 = dataTableStorageFactory.getTableByPartition('TmHistoriaPaciente', paciente.RowKey);
        
        $ionicLoading.show();
        $q.all([p1]).then(function(data){
        	$ionicLoading.hide();
	        if(data[0].data !=null && !angular.isUndefined(data[0])){
	            var result = data[0].data[0];
	            $scope.Datos = result;
        	} 
        });	
	}


	$scope.inicializar = function(){
		if(angular.isUndefined($scope.Datos)){
			$scope.Datos = {};			
		}
	}

	load();

}])