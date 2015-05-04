angular.module('starter').
directive('tratamientoUserControl', [function () {
	return {
		restrict: 'E',
        scope:{
            delete : '=',
        },
		controller : 'tratamientosCtrl',
        templateUrl: 'templates/directives/tratamientos/tratamientosUserControl.html'
	};
}]);

angular.module('starter')
.controller("tratamientosCtrl", ['$rootScope','$scope', 'dataTableStorageFactory', 'dataBlobStorageFactory','sharedDataService','users', 'messageService', 

    function ($rootScope, $scope, dataTableStorageFactory, dataBlobStorageFactory, sharedDataService, users, messageService) {
    
    var usuario = users.getCurrentUser();
    var Listado = [];
    $scope.items = [];
    $scope.textoBuscar = "";
    $scope.shouldShowDelete = false;   
    
    $scope.shouldShowDelete = $scope.delete;   


  
    $scope.clickSeleccionado = function(e){
        sharedDataService.putTratamientoSeleccionado(e);        
    }

    $scope.$on('elemento-dental-seleccionado', function(event, args){       
        var seleccionado = args.seleccionado.item;

        if(seleccionado.numeroPiezaDental == "Boca"){
            $scope.textoBuscar = "Aplica para boca";
        }
        else{
            $scope.textoBuscar = "Aplica para superficies y pieza completa";            
        }
        
    });

    $scope.eliminar = function(e, $index){
        $scope.items.splice($index, 1)
        dataTableStorageFactory.deleteFromStorage(e);
    }

     function get() {
        dataTableStorageFactory.getTableByPartition('TpTratamientos', usuario.username)
            .success(function (data) {
                
                if(data.length == 0){
                    messageService.showMessage("No se han encontrado procedimientos parametrizados, Por favor vaya Menu -> Tratamientos y adicione como minimo uno");
                }
                else{
                    Listado = data;
                    $scope.items = Listado;
                }
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    } 

    get();
}]);
