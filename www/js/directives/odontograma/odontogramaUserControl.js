angular.module('starter').
directive('odontogramaUserControl', [function () {
	return {
		restrict: 'E',
		controller : 'odontogramaCtrl',
		templateUrl : 'templates/directives/odontogramaUserControl.html'
	};
}]);

angular.module('starter')
.controller("odontogramaCtrl", ['$scope', 'dataTableStorageFactory', 'dataBlobStorageFactory', 'sharedDataService', 'dataTableStorageFactory','leerOdontogramaServices','users','$state','$ionicLoading', '$q', 'indicesServices','piezasService', '$rootScope','platformService', 

    function ($scope, dataTableStorageFactory, dataBlobStorageFactory, sharedDataService, dataTableStorageFactory,leerOdontogramaServices, users, $state, $ionicLoading, $q, indicesServices, piezasService, $rootScope, platformService) {
    
     var usuario = users.getCurrentUser();
     var i = 0;
     var index = 0;
     var pacienteId = $state.params.pacienteId; 
     $scope.items = [];
     $scope.esMobile = platformService.esMobile();  

     $scope.$on('supernumerario', function(event, args){      
        var seleccionado = args.seleccionado;
        var direccion = args.direccion;
        var index = _.indexOf($scope.items, seleccionado);
         

        if(direccion === "derecha"){
            index = index+1;
        }

        i = i+1;

        var supernumerarioAgregar = {numeroPiezaDental: 'S' + i, esSupernumerario : true, _numeroSuperNumerario : i, parte: seleccionado.parte};
        $scope.items.splice(index,0, supernumerarioAgregar);

        supernumerarioAgregar.nombreTabla = 'TmOdontogramaSupernumerario';
        supernumerarioAgregar.RowKey = i;
        supernumerarioAgregar.PartitionKey = usuario.username + 'paciente' + pacienteId;
        supernumerarioAgregar.index = index;
        supernumerarioAgregar.direccion = direccion;
        supernumerarioAgregar.numeroPiezaDentalReferencia = seleccionado.numeroPiezaDental;
        dataTableStorageFactory.saveStorage(supernumerarioAgregar);
    });

  

    $scope.$on('eliminar-supernumerario', function(event, args){      
        var seleccionado = args.seleccionado;
        var index = _.indexOf($scope.items, seleccionado);        
        
        $scope.items.splice(index, 1);
        dataTableStorageFactory.deleteFromStorage(seleccionado);
        
    });

    $scope.$on('Odontograma cargado', function(event, args){      
        $scope.items = args.Piezas;
        $ionicLoading.hide();
    }); 
    

    $ionicLoading.show();
    leerOdontogramaServices.load(usuario, pacienteId);
}]);
