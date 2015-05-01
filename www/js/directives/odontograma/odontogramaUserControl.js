angular.module('starter').
directive('odontogramaUserControl', [function () {
	return {
		restrict: 'E',
		controller : 'odontogramaCtrl',
		templateUrl : 'templates/directives/odontogramaUserControl.html'
	};
}]);

angular.module('starter')
.controller("odontogramaCtrl", ['$scope', 'dataTableStorageFactory', 'dataBlobStorageFactory', 'sharedDataService', 'dataTableStorageFactory','leerOdontogramaServices','users','$state','$ionicLoading', '$q', 'indicesServices',

    function ($scope, dataTableStorageFactory, dataBlobStorageFactory, sharedDataService, dataTableStorageFactory,leerOdontogramaServices, users, $state, $ionicLoading, $q, indicesServices) {
    
     var usuario = users.getCurrentUser();
     var i = 0;
     var index = 0;
     var pacienteId = $state.params.pacienteId;   
     $scope.numeroPiezasPresentes = 1;

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

     $scope.$on('idice placa bacteriana', function(event, args){      
        var indice = args.indice;
        $scope.indicePlacaBacteriana = round((indice * 100) / $scope.numeroPiezasPresentes, 2);
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
        dataTableStorageFactory.saveStorage(item);            
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

    $scope.numeroPiezasDentales = function(){
        var numeroPiezas = {};
        numeroPiezas.nombreTabla = 'TmIndicesPacientes';
        numeroPiezas.RowKey = 'numeropiezasdentales';
        numeroPiezas.PartitionKey = usuario.username + 'paciente' + pacienteId;        
        numeroPiezas.numeroPiezas = $scope.numeroPiezasPresentes;
        saveStorage(numeroPiezas);
    }

    function load(){
        indicesServices.inicializar();
        var partition = usuario.username + 'paciente' + pacienteId;
        var p1 = dataTableStorageFactory.getJsonData('Odontograma.json');
        var p2 = dataTableStorageFactory.getTableByPartition('TmIndicesPacientes', partition);

        $ionicLoading.show();
        $q.all([p1, p2]).then(function(data){
            var odontograma = data[0].data;

            if(!angular.isUndefined(data[1].data[0])){
                var numeroPiezasDentales = data[1].data[0].numeroPiezas;
                $scope.numeroPiezasPresentes = numeroPiezasDentales;
            }
            
            $scope.items = odontograma;             

            $ionicLoading.hide();
            obtenerSupernumerarios();
        });        
    }

    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    load();
    
}]);
