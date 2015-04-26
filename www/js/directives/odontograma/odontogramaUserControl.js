angular.module('starter').
directive('odontogramaUserControl', [function () {
	return {
		restrict: 'E',
		controller : 'odontogramaCtrl',
		templateUrl : 'templates/directives/odontogramaUserControl.html'
	};
}]);

angular.module('starter')
.controller("odontogramaCtrl", ['$scope', 'dataTableStorageFactory', 'dataBlobStorageFactory', 'sharedDataService', 'dataTableStorageFactory','leerOdontogramaServices','users','$state','$ionicLoading',

    function ($scope, dataTableStorageFactory, dataBlobStorageFactory, sharedDataService, dataTableStorageFactory,leerOdontogramaServices, users, $state, $ionicLoading) {
    
        var usuario = users.getCurrentUser();
        var i = 0;
        var index = 0;
        var pacienteId = $state.params.pacienteId;

    $scope.items = [        
        {numeroPiezaDental: 18, esSupernumerario : false, parte:'parte1' },
        {numeroPiezaDental: 17, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 16, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 15, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 14, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 13, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 12, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 11, esSupernumerario : false, parte:'parte1'},

        {numeroPiezaDental: 21, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 22, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 23, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 24, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 25, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 26, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 27, esSupernumerario : false, parte:'parte1'},
        {numeroPiezaDental: 28, esSupernumerario : false, parte:'parte1'},

        {numeroPiezaDental: 55, esSupernumerario : false, parte:'parte2' },
        {numeroPiezaDental: 54, esSupernumerario : false, parte:'parte2'},
        {numeroPiezaDental: 53, esSupernumerario : false, parte:'parte2'},
        {numeroPiezaDental: 52, esSupernumerario : false, parte:'parte2'},
        {numeroPiezaDental: 51, esSupernumerario : false, parte:'parte2'},        

        {numeroPiezaDental: 61, esSupernumerario : false, parte:'parte2'},
        {numeroPiezaDental: 62, esSupernumerario : false, parte:'parte2'},
        {numeroPiezaDental: 63, esSupernumerario : false, parte:'parte2'},
        {numeroPiezaDental: 64, esSupernumerario : false, parte:'parte2'},
        {numeroPiezaDental: 65, esSupernumerario : false, parte:'parte2'},

        {numeroPiezaDental: 85, esSupernumerario : false, parte:'parte3' },
        {numeroPiezaDental: 84, esSupernumerario : false, parte:'parte3'},
        {numeroPiezaDental: 83, esSupernumerario : false, parte:'parte3'},
        {numeroPiezaDental: 82, esSupernumerario : false, parte:'parte3'},
        {numeroPiezaDental: 81, esSupernumerario : false, parte:'parte3'},        

        {numeroPiezaDental: 71, esSupernumerario : false, parte:'parte3'},
        {numeroPiezaDental: 72, esSupernumerario : false, parte:'parte3'},
        {numeroPiezaDental: 73, esSupernumerario : false, parte:'parte3'},
        {numeroPiezaDental: 74, esSupernumerario : false, parte:'parte3'},
        {numeroPiezaDental: 75, esSupernumerario : false, parte:'parte3'},

        {numeroPiezaDental: 48, esSupernumerario : false, parte:'parte4' },
        {numeroPiezaDental: 47, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 46, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 45, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 44, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 43, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 42, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 41, esSupernumerario : false, parte:'parte4'},

        {numeroPiezaDental: 31, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 32, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 33, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 34, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 35, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 36, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 37, esSupernumerario : false, parte:'parte4'},
        {numeroPiezaDental: 38, esSupernumerario : false, parte:'parte4'},
        
    ];
        

    

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

        supernumerarioAgregar.nombreTabla = 'TpOdontogramaSupernumerario';
        supernumerarioAgregar.RowKey = i;
        supernumerarioAgregar.PartitionKey = usuario.username + 'paciente' + pacienteId;
        supernumerarioAgregar.index = index;
        supernumerarioAgregar.direccion = direccion;
        supernumerarioAgregar.numeroPiezaDentalReferencia = seleccionado.numeroPiezaDental;
        saveStorage(supernumerarioAgregar);
    });

     $scope.$on('eliminar-supernumerario', function(event, args){      
        var seleccionado = args.seleccionado;
        var index = _.indexOf($scope.items, seleccionado);        
        
        $scope.items.splice(index, 1);
        deleteFromStorage(seleccionado);
        
    });

    function obtenerOdontograma(){
        dataTableStorageFactory.getTableByPartition('TpOdontograma', usuario.username + 'paciente' + pacienteId)
        .success(function(data){
            leerOdontogramaServices.odontogramaToUi(data);
            $ionicLoading.hide();
        }).error(function(error){
            $ionicLoading.hide();
        })
    }

    function saveStorage(item){
        dataTableStorageFactory.postTable(item)
            .success(function (data) {
              
            })
            .error(function (error) {
               
            });
    }

    function deleteFromStorage(item){
        item.Estado_Entidad = 2;        
        dataTableStorageFactory.postTable(item)
            .success(function (data) {
              
            })
            .error(function (error) {
               
            });
    }

    function obtenerSupernumerarios(){

        $ionicLoading.show();
        dataTableStorageFactory.getTableByPartition('TpOdontogramaSupernumerario', usuario.username + 'paciente' + pacienteId)
        .success(function(data){
            for (var i = 0; i < data.length; i++) {
                var item = data[i];

                var index = _.findIndex($scope.items, function(chr) {
                  return chr.numeroPiezaDental == item.numeroPiezaDentalReferencia;
                });

                if(item.direccion === "derecha"){
                    index = index+1;
                }

                $scope.items.splice(index, 0, item);
            };

            obtenerOdontograma();

        }).error(function(error){

        })
    }   

    obtenerSupernumerarios();
    
}]);
